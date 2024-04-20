const express = require('express')
// const dotenv = require('dotenv').config({path:"./root.env"})
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, 'root.env') });
// const products = require(path.join(__dirname, 'data', 'products.js')) abb ye sidhe data base se ayenge
const cors = require("cors");
const mongoose = require('mongoose')
const connectDB = require('./config/DB')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler}= require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const orderRoutes = require('./routes/orderRoutes')
const PORT = process.env.PORT || 5000  
const uploads = require('./routes/uploadRoutes')
const app=express() 
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const filePayloadExists = require('./middleware/filePayloadExists')
const fileExtLimiter = require('./middleware/fileExtLimiter')
// JSON body parser middleware
app.use(express.json())
// JSON Form parser middleware url encoded
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(cors());
// app.use( 
//     cors({
//       origin: 'http://localhost:5173',
//       credentials: true
//     })
//   ) 
  app.use(cors({
    origin: 'http://localhost:5173', // Adjust the origin based on your frontend URL
    credentials: true
  }))
// console.log(products)
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploads)
app.get('/api/config/paypal',(req,res)=>res.send({clientID:process.env.PAYPAL_CLIENT_ID}))

const __dir2name = path.resolve()
app.use('/uploads',express.static(path.join(__dir2name,'/uploads')))
app.use(notFound)
app.use(errorHandler) 
connectDB()
mongoose.connection.once('open',()=>{ 
    console.log("Connected to DB")
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
// filePayloadExists,
// fileExtLimiter(['.png', '.jpg', '.jpeg']),
// fileSizeLimiter,