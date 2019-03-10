const assert = require('assert');
const User = require('../src/user');


describe('Creating records', function () {
    it('saves the user', function (done) {
        // Instantiate record
        const joe = new User({ name: 'Joe'});
        
        // Save the record to the database 
        // Any database process is async 
        joe.save()
        .then(() => {
            // Has Joe been saved successfully?
            assert(!joe.isNew);
            done();
        }); 
    });
});
