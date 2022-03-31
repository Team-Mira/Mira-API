const express = require('express');
const app = express();
const apiErrorHandler = require('./server/errors/ApiErrorHandler')


// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./server/api'));

// error handling endware
app.use(apiErrorHandler)

app.get('/', (req, res) => res.send('Mira API'))

module.exports = app
