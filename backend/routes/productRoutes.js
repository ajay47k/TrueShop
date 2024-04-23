const express = require('express')
const Router = express.Router()
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
}= require('./../controller/productController')
const {protect,admin} = require('./../middleware/authMiddleware')
Router.route('/').get(getAllProducts).post(protect,admin,createProduct)
Router.get('/top',getTopProducts)
Router.route('/:id').get(getProduct).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)
Router.route('/:id/reviews').post(protect, createProductReview)
module.exports = Router
