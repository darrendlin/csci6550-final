const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

console.log(`Connecting to ${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}...`);

pool.getConnection((err, connection) => {
  if (err || !connection) {
    console.error('Invalid MySQL connection!');
    console.error(err);
    process.exit();
  }
  if (connection) connection.release();
  console.log(`Connected to MySQL ${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}!`);
});

module.exports = pool;