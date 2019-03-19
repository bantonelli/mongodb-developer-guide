const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', function () {
    let joe;

    beforeEach((done) => {
        joe = new User({name: "Joe"});
        joe.save().then(() => done());
    });

    it('model instance remove', function (done) {
        joe.remove()
        .then(function () {
            return User.findOne({_id: joe._id});            
        })
        .then((result) => {
            assert(result === null);
            done();
        });
    });

    it('model class method remove', function (done) {
        User.remove({ name: 'Joe'})
        .then(function () {
            return User.findOne({_id: joe._id});            
        })
        .then((result) => {
            assert(result === null);
            done();
        });   
    });

    it('class method findOneAndRemove()', function (done) {
        User.findOneAndRemove({ name: 'Joe' })
        .then(() => {
            return User.findOne({_id: joe._id});            
        })
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('class method findByIdAndRemove()', function (done) {
        User.findByIdAndRemove(joe._id)
        .then(() => {
            return User.findOne({_id: joe._id});
        })
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});