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

<<<<<<< HEAD
db.sequelize.sync().then(() => console.log('Database is synced'));

=======
db.sequelize.sync()
.then(() => {
  console.log('DB synced');
})
.catch(err => {
  console.error('Unable to sync database:', err);
});
>>>>>>> 10866b235bb7295584184783ba4bab07defe89fb

app.listen(PORT, () => console.log(`Started on port ${PORT}`));
