const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', function () {
    let joe;

    beforeEach(function (done) {
        joe = new User({name: 'Joe'});
        joe.save().then(() => {
            done();
        });
    });

    it('finds all users with a name of Joe', function (done) {
        // How do we execute a query? --> where record.name == 'Joe' 
        User.find({name: 'Joe'}).then((usersArray) => {
            // logic 
            // console.log("JOE ID: ", joe._id);
            console.log(usersArray);
            assert(usersArray[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it("should find a user with a particular id", function (done) {
        User.findOne({_id: joe._id}).then((user) => {
            console.log('USER: ', user);
            assert(user.name === joe.name);
            done();            
        });
    });

});