const fs = require('fs')
module.exports = {
  development: {
    username: "",
    password: "",
    database: "mira-db",
    host: 'localhost',
    port: "5432",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: process.env.DATABASE_URL,
    port: process.env.PORT,
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
