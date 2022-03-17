const express = require('express');
const db = require('./server/db');
const PORT = process.env.PORT || 8080;
const app = express();



db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

db.sync().then(() => console.log('Database is synced'));



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

app.listen(PORT, () => console.log(`Started on port ${PORT}`));
