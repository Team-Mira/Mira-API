const fs = require('fs')
module.exports = {
  development: {
    username: "",
    password: "",
    database: "mira-db",
    host: 'localhost',
    port: "5432",
    logging: false,
    dialect: "postgres",
  },
  test: {
    username: "christopher",
    password: '1226Bazan07',
    database: "mira-db",
    host: 'localhost',
    port: '5432',
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.NAME,
    port: "5432",
    dialect: "postgres",
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
