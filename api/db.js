const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1', // this will be the hostname of the database server
    user: 'root', //  username to connect to the database
    password: 'root', // the password to connect to the database
    database: 'guitarstore', // this will be the name of the database to connect to
    port: 8889 
});


db.connect((err) => {  // connect to the database

    if (err) { // logs an error message if the connection fails
        console.error('Error connecting: ' + err.stack);
        return;
    }
    
    console.log('Connected as id ' + db.threadId); // logs a success message with the thread id
});
    
module.exports = db;