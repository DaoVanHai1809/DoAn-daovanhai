const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ViewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: '000000000000'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('views', ViewSchema)