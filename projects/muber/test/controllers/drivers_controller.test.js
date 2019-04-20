const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('POST to /api/drivers creates a new driver', (done) => {
        Driver.count()
        .then((number) => {
            number = number;
            request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com' })
            // NO END CALL DUE TO PROMISE USAGE
            // .end((err, response) => {
            //     console.log(response.body);
            //     return Driver.count()
            // })
            .then((response) => {
                // console.log(response.body);
                return Driver.count();
            })
            .then((finalNumber) => {
                assert(number === finalNumber - 1);
                done();
            });                                
        });
        // .then(() => {
        //     return Driver.count();
        // })
        // .then((finalNumber) => {
        //     assert(number === finalNumber - 1);
        //     done();
        // });
    });
});