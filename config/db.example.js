const mysql      	 = require('mysql');
const db_connect = mysql.createPool({
    connectionLimit  : 10,
    host             : 'host',
    user             : 'user',
    password         : 'password',
    database         : 'database'
});
module.exports = db_connect;