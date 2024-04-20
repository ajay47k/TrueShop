const jwt = require("jsonwebtoken")
const asyncHandler = require("./asyncHandler")
const User= require("./../models/userModel")
const protect = asyncHandler(async (req,res,next)=>{
    let token
    // console.log(req)
    token = req.cookies.jwt
    if (token){
        try{
            const decoded = jwt.verify(token,process.env.JWT)
            // console.log(decoded)
            // We check if user exist in Db to ensure it is not a cookie stolen attack on us 
            req.user=await User.findById(decoded.userId).select('-password')
            // console.log(req.user)
            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

// Admin middleware
const admin = (req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized, as admin')
    }
}
module.exports = {protect,admin}