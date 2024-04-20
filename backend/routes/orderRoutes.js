const express = require("express")
const Router = express.Router()
const {protect,admin}= require('./../middleware/authMiddleware')
const {    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders } = require('./../controller/orderController') 

Router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
Router.route('/mine').get(protect, getMyOrders)
Router.route('/:id').get(protect,getOrderById)
Router.route('/:id/pay').put(protect,updateOrderToPaid)
Router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
module.exports=Router