
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    favoriteMovies: [mongoose.Types.ObjectId]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;