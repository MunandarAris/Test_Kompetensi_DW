const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'db_task_collections'
});

module.exports = connection;