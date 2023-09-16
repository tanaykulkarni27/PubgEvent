const mysql = require('mysql2'); // Use 'mysql2/promise' for async/await support
require('dotenv').config();



// Define your MySQL database connection settings
const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};


const pool = mysql
    .createPool(dbConfig)
    .promise();
    
module.exports = { pool };