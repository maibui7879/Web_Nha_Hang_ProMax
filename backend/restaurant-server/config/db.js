const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '7879maibui', 
    database: 'restaurant'
});

module.exports = db;
