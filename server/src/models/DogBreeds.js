const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DogBreedSchema = new Schema({
    breedName: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('dogBreeds', DogBreedSchema)