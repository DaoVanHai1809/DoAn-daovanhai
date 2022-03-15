const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [2, 3,4]  // 2: admin; 3: moderator; 4: user
    },
    status: {
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)