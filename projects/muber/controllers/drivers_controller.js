const Driver = require('../models/driver');

function greeting (req, res) {
    res.send({ hi: "there" });
}

function create (req, res) {
    // res.send({ success: true });
    const driverProps = req.body;

    var driver = new Driver(driverProps);
    driver.save().then((driver) => {
        res.send({ driver: driver, thing: "thing2"});
    });
    // Driver.create(driverProps)
    // .then(driver => res.send(driver));
}

module.exports = {
    greeting,
    create
};