const mongoose = require('mongoose');

const Schema = mongoose.Schema

const DogSchema = new Schema({
    dogId:{
        type: String,
        required: true,
        unique: true,
    },
    dogname:{
        type: String,
        required: true,
        unique: true,
    },
    breedId:{
        type: Schema.Types.ObjectId,
        ref: 'dogBreeds'
    },
    age:{
        type: Number,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    }
},{ timestamps: true });

module.exports = mongoose.model('dogs', DogSchema);