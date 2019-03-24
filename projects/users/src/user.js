const mongoose = require('mongoose');
// Allows us to create a Schema for our User model 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // type of 'name' property is simply vanilla JS String class type. 
    name: {
        type: String,
        required: [true, 'Name is required.'],
        validate: {
            validator: (name) => {
                if (name.length > 2) {
                    return true;
                } else {
                    return false;
                } 
            },
            message: "Name must be longer than 2 characters."
        } 
    },
    postCount: Number 
});

const User = mongoose.model('user', UserSchema);

module.exports = User;