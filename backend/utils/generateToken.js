// const jwt = require('jsonwebtoken')
// const generateToken= (res,userId)=>{
//     const token = jwt.sign({userId},process.env.JWT,{expiresIn:'30d'})

//     res.cookie('jwt',token,{
//         httpOnly:true,
//         secure:process.env.NODE_ENV !== 'development',
//         sameSite:"True",
//         maxAge:30*24*60*60*1000
// })
// console.log(res)
// }
// module.exports = {generateToken}
const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
//   console.log(res)
};

module.exports = {generateToken}