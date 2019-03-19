const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/users_test');

    mongoose.connection
    .once('open', () => {        
        console.log('Connected to Mongo Database')
        done();
    })
    .on('error', (error) => {
        console.warn('Warning: ', error);
    });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // ready to run the next test. 
        done();
    });
});

