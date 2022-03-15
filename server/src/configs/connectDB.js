const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@node-tt.ekoka.mongodb.net/node-tt?retryWrites=true&w=majority`,{
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