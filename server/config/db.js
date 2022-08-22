const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arijid0928",
    database: "test"
});

module.exports = db;