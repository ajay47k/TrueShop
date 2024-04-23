const Product =require('./../models/productModel')
const mongoose = require('mongoose')
const asyncHandler= require('./../middleware/asyncHandler')
// @desc    Get all products
// @route   GET /api/products
// @access  Public

const getAllProducts= asyncHandler(async (req,res)=>{
        // const products = await Product.find({})
        // if(products.length==0)
        //     return res.status(400).json({error:"User Does not exist"})   
        // res.status(200).json({products})
        // res.status(500).json({error: "Internal Server error"})
        // throw err
        const pageSize=8
        const page=Number(req.query.pageNumber) || 1
        const keyword=req.query.keyword? {name:{$regex:req.query.keyword, $options:'i'}}:{}
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
        res.status(201).json({products,page,pages:Math.ceil(count/pageSize)})
        // res.status(201).json({products})
})
// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public

const getProduct= asyncHandler(async (req,res)=>{
        // const id=req.params.id
        // // console.log(typeof(new ObjectId(id)))
        // if (!id) {
        //     return res.status(400).json({ error: "Product id is required" })
        // }
        // if (!mongoose.Types.ObjectId.isValid(id)) 
        // return res.status(404).json({ msg: `No Product with id :${id}` 
        //     })

        // const product = await Product.findById(id)
        // if(!product){ 
        //     return res.status(400).json({error:"Product Does not exist"})   
        // }
        // res.status(200).json({product})

        // console.log(err)
        // res.status(500).json({error: "Internal Server error"})
        // throw err
        const product = await Product.findById(req.params.id)
        if(product){
            return res.status(201).json(product)
        }  else {
            res.status(404)
            throw new Error('Product not found')
        }
        
})
// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct= asyncHandler(async (req,res)=>{
    // const products = await Product.find({})
    // if(products.length==0)
    //     return res.status(400).json({error:"User Does not exist"})   
    // res.status(200).json({products})
    // res.status(500).json({error: "Internal Server error"})
    // throw err
    // const products = await Product.find({})
    // res.status(201).json({products})
    // console.log("Here")
    // console.log(req)
    const createProduct = new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image: '/images/sample.jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description',
    })
    // console.log(createProduct)
    // const createdProduct = await Product.save()
    const createdProduct = await createProduct.save();
    // console.log(createdProduct)
    res.status(201).json(createdProduct)
})
// @desc    update products
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct= asyncHandler(async (req,res)=>{
    const {name,price,description,image,brand,category,countInStock }= req.body
    const product= await Product.findById(req.params.id)
    if (product) {
        product.name = name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }

})

// @desc    Delete a products
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct= asyncHandler(async (req,res)=>{

    const product= await Product.findById(req.params.id)
    if (product) {
        await Product.deleteOne({_id:product._id})
        res.status(204).json({message:'Product removed'})
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }

})

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview= asyncHandler(async (req,res)=>{

    const product= await Product.findById(req.params.id)
    const {rating, comment}= req.body
    if (product) {
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if (alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating= product.reviews.reduce((acc,review)=> acc+review.rating,0)/product.reviews.length
        await product.save()
        res.status(201).json({message:'review added'})
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }

})


// @desc    Get TOP rated products
// @route   GET /api/products/:id
// @access  Public

const getTopProducts= asyncHandler(async (req,res)=>{

    const products = await Product.find({}).sort({rating:-1}).limit(3)
    console.log(products)
    res.status(200).json(products)
    
})
module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} 