const express = require('express');
const app = express();


// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./server/api'));

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);

app.get('/', (req, res) => res.send('Mira API'))

module.exports = app