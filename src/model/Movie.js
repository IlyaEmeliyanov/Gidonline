
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    imgName: {
        type: String,
        required: true
    },
    mainActors: {
        type: [String],
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    parentalGuidance: String,
    releaseDate: {
        type: Date,
        default: Date.now()
    }
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;