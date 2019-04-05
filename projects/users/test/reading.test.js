const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', function () {
    let joe, maria, alex, zach;

    beforeEach(function (done) {
        alex = new User({ name: 'Alex' });
        joe = new User({name: 'Joe'});
        maria = new User({ name: 'Maria' });
        zach = new User({name: 'Zach'});
        
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
        .then(() => {
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

    it('can skip and limit the result set', (done) => {
        User.find({})
        .sort({
            name: 1
        })
        .skip(1)
        .limit(2)
        .then((users) => {
            assert(users.length === 2);
            assert(users[1].name === 'Maria');
            assert(users[0].name === 'Joe');
        })                
        done();
    });
});