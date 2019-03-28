const mongoose = require('mongoose');
// Allows us to create a Schema for our User model 
const Schema = mongoose.Schema;
const PostSchema = require('./post');

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
    posts: [PostSchema],
    blogPosts: [{type: Schema.Types.ObjectId, ref: 'blogPost'}] 
});  

// Tell our User Schema to set up a virtual field 
UserSchema.virtual('postCount').get(function (){
    /*
    We are using the 'function' keyword instead of arrow function 
    
    .get():
        - This is basically an ES6 getter 
        - So we can define a functional/computed value for the virtual. 
    */
});

const User = mongoose.model('user', UserSchema);

module.exports = User;