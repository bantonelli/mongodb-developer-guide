const express = require('express');
const bodyParser = require('body-parser');

// App object - This is the server
const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.json());

routes(app);

module.exports = app; 