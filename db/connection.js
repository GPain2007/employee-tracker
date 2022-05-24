const mysql = require("mysql2");
const config = require("config");
const mysqlPassword = config.get("mysqlPassword");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: mysqlPassword,
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
});

const Sequelize = require("sequelize");

require("dotenv").config();

// create connection to our db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = { sequelize, connection };
