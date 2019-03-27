const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', function () {
    it('postCount should return number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [
                { title: 'Post 1' },
                { title: 'Post 2' }
            ]
        })
        joe.save()
        .then(() => {
            return User.findOne({name: 'Joe'})
        }) 
        .then((user) => {            
            assert(user.postCount === 2);
            done();
        })
    });
});