const mongoose = require('mongoose');
// Allows us to create a Schema for our User model 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // type of 'name' property is simply vanilla JS String class type. 
    name: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;