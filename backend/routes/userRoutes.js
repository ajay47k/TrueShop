const express = require('express')
const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
} = require('./../controller/userController')
const Router = express.Router()
const {protect,admin}= require('./../middleware/authMiddleware')
// Router.route('/').get(protect,admin,getUsers).post(registerUser)
Router.route('/').get(protect,admin,getUsers)
Router.post('/register',registerUser)
Router.post('/logout',logoutUser)
Router.post('/login',authUser )
Router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
Router.route('/:id').get(protect,admin,getUserByID).put(protect,admin,updateUser).delete(protect,admin,deleteUser)

module.exports = Router