const db = require('./server/db');
const PORT = process.env.PORT || 8080;
const app = require('./app')


db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.listen(PORT, () => console.log(`Started on port ${PORT}`));
