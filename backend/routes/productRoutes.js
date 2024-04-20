const express = require('express')
const Router = express.Router()
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}= require('./../controller/productController')
const {protect,admin} = require('./../middleware/authMiddleware')
Router.route('/').get(getAllProducts).post(protect,admin,createProduct)
Router.route('/:id').get(getProduct).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)

module.exports = Router
