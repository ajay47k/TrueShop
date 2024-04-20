const asyncHandler= require('./../middleware/asyncHandler')
const User = require('./../models/userModel')
// const jwt = require('jsonwebtoken')
const {generateToken} = require('./../utils/generateToken')
// @Desc Auth User and get token
// @route POST /api/users/login
// @access Public
const  authUser= asyncHandler( async(req,res)=>{
    const {email,password}= req.body
    // console.log(req.body)
    const user = await User.findOne({email:email})
    // console.log(user)
    if (user && (await user.matchPassword(password))){
        // const token = jwt.sign({ userId:user._id},process.env.JWT,{expiresIn:'30d'})
        // // Set JWT as HTTP-only Cookie
        // res.cookie('jwt',token,{
        //     httpOnly:true,
        //     secure: process.env.NODE_ENV!=='DEVELOPMENT',
        //     sameSite:'strict',
        //     maxAge: 30*24*60*60*1000// 30 days
        // })
        // console.log("Here")
        generateToken(res,user._id)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            // token:token
        })
        // console.log("Use Here")
        // console.log(res)
    } else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
 
}
)

// // @Desc Register User
// // @route POST /api/users/login
// // @access Public
// const  loginUser= asyncHandler( async(req,res)=>{
//     res.send('User loggedin')   
// }
// )

// @Desc Register User
// @route POST /api/users
// @access Public
const  registerUser= asyncHandler( async(req,res)=>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
    })}
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})
    // res.send('registered User')


// @Desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const  logoutUser = asyncHandler( async(req,res)=>{
    res.cookie('jwt',"",{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:'Logged out Successfully'})
    // res.send('logout User')   
}
)

// @Desc get user profile
// @route GET /api/users/profile
// @access Private
const  getUserProfile= asyncHandler( async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
}
)

// @Desc update user profile
// @route PUT /api/users/profile
// @access Private
const  updateUserProfile= asyncHandler( async(req,res)=>{
    // res.send('update user profile')   
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

}
)

// @Desc get user profile
// @route GET /api/users
// @access Private/Admin
const  getUsers= asyncHandler( async(req,res)=>{
    // res.send('Get users')   
    const users = await User.find({})
    // console.log(users)
    res.status(201).json(users)
}
)

// @Desc get user profile BY ID
// @route GET /api/users/:id
// @access Private/Admin
const  getUserByID= asyncHandler( async(req,res)=>{
    // res.send('requested user profile')   
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.status(200).json(user)
    }else{
        // res.status(404).json({message:'User not found'})
        res.status(404)
        throw new Error('User not found')
    }

    // res.status.json(users)
}
)

// // @Desc delete users
// // @route DELETE /api/users/:id
// // @access Private/Admin
// const  deleteUsers= asyncHandler( async(req,res)=>{
//     res.send('update user profile')   
// }
// )

// @Desc delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const  deleteUser= asyncHandler( async(req,res)=>{
    // res.send('delete user profile') 
    const user = await User.findById(req.params.id).select('-password')
    if (user){
        if(user.isAdmin){
            res.status(400)
            throw new Error('Admin cannot be deleted')
        } else {
            await User.deleteOne({_id:req.params.id})
            res.status(200).json({message:'User deleted'})
        }
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
}
)

// @Desc Update users
// @route PUT /api/users/:id
// @access Private/Admin
const  updateUser= asyncHandler( async(req,res)=>{
    // res.send('update user profile')   
    const user=await User.findById(req.params.id)
    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin= Boolean(req.body.isAdmin) || user.isAdmin
        const updatedUser = await user.save()
        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}
)

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}

