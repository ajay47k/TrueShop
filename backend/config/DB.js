const mongoose = require('mongoose');
const connectDB = async () => {
    // console.log(process.env)
    try {
        await mongoose.connect(process.env.MONGODB, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
    } catch (err) {  
        console.error(err); 
    }
} 

module.exports = connectDB