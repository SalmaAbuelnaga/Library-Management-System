const mysql = require('mysql2');

const db = {
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    multipleStatements:true
};

const connection = mysql.createConnection(db);


module.exports = {connection};