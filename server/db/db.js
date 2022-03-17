const Sequelize = require('sequelize');

let db

if(process.env.DATABASE_URL){
  db = new Sequelize(
    process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
    }
  );
} else {
  db = new Sequelize(
    'postgres://localhost:5432/mira-db'
  )
}

module.exports = db;
