const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://daovanhai:vanhaition@doan.ynuvq.mongodb.net/DoAn?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDB