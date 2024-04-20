const asyncHandler = require('express-async-handler')
const Order = require('./../models/orderModel')

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body
    let createOrder
    // if (orderItems && order.length==0){
        // console.log(shippingAddress)
    if (orderItems && orderItems.length==0){
        // console.log("Here")
        res.status(400)
        throw new Error('No order items')
    } else {
        
        const order = new Order({
            orderItems:orderItems.map((x)=>({...x,
            product: x._id,
            _id:undefined // set to undefined because we don't need it here and it will cause error
            })),
            user:req.user._id, 
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice:itemsPrice,
            taxPrice:taxPrice,
            shippingPrice:shippingPrice,
            totalPrice:totalPrice,
        })
        // console.log(order)
        createOrder = await order.save()

    }
    res.status(201).json(createOrder)
})

// @desc Get logged in user orders
// @route GET /api/orders
// @access Private
const getMyOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders)
    // res.send('logged in user orders Items')
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async(req,res)=>{// Id of the order
    const orders = await Order.findById(req.params.id).populate('user','name email')
    res.status(200).json(orders)
    // res.send('get order by id')
    if (order){
        res.status(200).json(order)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    // res.send('update order to paid')
    const order = await Order.findById(req.params.id)
    if (order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult ={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc Update order to Delivered
// @route GET /api/orders/:id/deliver
// @access Private/deliver
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    // res.send('update order to delivered')
    const order =await Order.findById(req.params.id)
    if (order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)
    }
})

// @desc Update order to Delivered
// @route GET /api/orders/
// @access Private/admin
const getOrders = asyncHandler(async(req,res)=>{
    // res.send('get all orders')
    const orders = await Order.find({}).populate('user','id name')
    res.status(200).json(orders)
})

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders  
}
