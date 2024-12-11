const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: String, unique: true},  
    firstname: {type: String, required: true},
    lastname: String,
    age: {type: Number, min: 0},
});

const User = mongoose.model('User', userSchema);

module.exports = User;