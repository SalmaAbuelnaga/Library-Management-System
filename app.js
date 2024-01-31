const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

const conn = mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

conn.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });



app.get('/',(req,res)=>{
    res.send("hi");
})



conn.end();
app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port 3000");
});
