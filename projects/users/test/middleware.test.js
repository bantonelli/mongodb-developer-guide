const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blog-post');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: "JS is great", content: "Yup it really is!"});

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
        .then(() => {
            done();
        });
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
        .then(() => {
            return BlogPost.count();
        })
        .then((numberOfPosts) => {
            assert(numberOfPosts === 0);
            done();
        });
    });

}); 
