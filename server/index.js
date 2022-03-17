const path = require('path');
const express = require('express');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

db.sync().then(() => console.log('Database is synced'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);

app.listen(PORT, () => console.log(`Started on port ${PORT}`));
