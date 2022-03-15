const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    catename: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('categories', CategorySchema)