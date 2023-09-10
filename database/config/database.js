require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "workouteazy",
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
  },
};
