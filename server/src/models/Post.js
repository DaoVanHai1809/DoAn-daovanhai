const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String
    },
    thumbnail:{
        type: String
    },
    carousel: {
        type: Array
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cateid: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    totalView: {
        type: Number,
        default: 0
    }
},{ timestamps:true})

module.exports = mongoose.model('posts', PostSchema)