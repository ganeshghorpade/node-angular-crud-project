const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: 'root',       
  database: 'crud_db',  
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('MySQL Connected...');
});

module.exports = connection;
