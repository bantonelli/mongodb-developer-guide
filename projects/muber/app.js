const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App object - This is the server
const routes = require('./routes/routes');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');


app.use(bodyParser.json());

routes(app);

module.exports = app; 