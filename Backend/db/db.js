const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root', // MySQL username
  password: 'Pinkychandu3$', // MySQL password
  database: 'users_database', // MySQL database name
});

module.exports = db;
