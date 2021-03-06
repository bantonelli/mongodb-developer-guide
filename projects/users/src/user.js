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
    blogPosts: [{type: Schema.Types.ObjectId, ref: 'blogPost'}], 
    likes: Number 
});  

// Tell our User Schema to set up a virtual field 
UserSchema.virtual('postCount').get(function (){
    /*
    We are using the 'function' keyword instead of arrow function 
    so the 'this' keyword points to the UserSchema object 
    .get():
        - This is basically an ES6 getter 
        - So we can define a functional/computed value for the virtual. 
    */
    return this.posts.length;
});

UserSchema.pre('remove', function (next) {
    // this === joe
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => {
        next();
    });    
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
