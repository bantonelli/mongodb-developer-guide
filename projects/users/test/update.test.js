const assert = require('assert');
const User = require('../src/user');

describe('Updating records', function () {
    let joe; 
    
    beforeEach(function (done) {
        joe = new User({name: "Joe"});
        joe.save()
        .then(() => {
            done();
        });
    });

    function assertName(databaseOperation, done) {
        databaseOperation
        .then(() => {
            return User.find({});
        })
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    it('instance based update using set and save', function(done) {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('A model instance can update', function (done) {
        assertName(joe.update({name: 'Alex'}), done);
    });

    it('A model class can update', function (done) {
        assertName(User.update({ name: 'Joe'}, { name: 'Alex'}), done);
    });

    it('A model class can update one record', function(done) {
        assertName(User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}), done);
    });

    it('A model class can find a record with an Id and update', function(done) {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex'}), done);
    });

    it('A user can have their postCount property incremented by 1', (done) => {
        User.update({ name: 'Joe' }, { $inc: {likes: 1} })
        .then(() => {
            return User.findOne({ name: 'Joe' });
        })
        .then((userRecord) => {
            assert(userRecord.likes === 1);
            done();
        });
    });

});