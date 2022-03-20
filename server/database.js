const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'tatt',
    password: 'feicodbpwd',
    database: 'FeicoDB'
})