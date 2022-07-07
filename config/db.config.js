// const mysql = require('mysql');
const { createPool } = require('mysql');
const { promisify } = require('util');

require('dotenv').config();

// create here mysql connection
const { DB_HOST102, DB_USER102, DB_PASS102 } = process.env;

const db102 = createPool({
    connectionLimit: 10,
    host: DB_HOST102,
    user: DB_USER102,
    password: DB_PASS102,
  });

db102.getConnection((err, connection) => {
    if (err) {
      console.log('Error connected to database', err);
    } else if (connection) {
      console.log(`Database Connected ${DB_HOST102}`);
      connection.release();
    }
});

db102.query = promisify(db102.query);

module.exports = {db102};