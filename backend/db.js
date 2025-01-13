const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  // Your MySQL host
    user: 'root',       // Your MySQL username
    password: '',       // Your MySQL password
    database: 'quiz_app'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
