const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{ title: 'Post Title'}]
        }); 

        joe.save()
        .then(() => {
            return User.findOne({ name: 'Joe'});
        })
        .then((user) => {
            assert(user.posts[0].title === joe.posts[0].title);
            done();
        });
    });
    

    it('Can add subdocuments to an existing record', function (done) {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
        .then(() => {
            return User.findOne({ name: 'Joe' });
        })
        .then((user) => {
            user.posts.push({title: "New Post"});
            return user.save();
        })
        .then(() => User.findOne({ name: 'Joe'}))
        .then((user) => {
            assert(user.posts[0].title === 'New Post');
            done();        
        });
    });

    it('Can remove an existing subdocument', function (done) {
        const joe = new User({ 
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });

        joe.save()
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            // console.log("POSTS: ", user.posts[0].remove());
            user.posts[0].remove();
            return user.save();
        })
        .then(() => {
            return User.findOne({name: 'Joe'})
        })
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        });
    });
});