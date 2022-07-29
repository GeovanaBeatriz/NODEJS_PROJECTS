const express = require("express");
const dotenv = require("dotenv"); //arquivo onde ficarão as informações do usuário
const path = require("path");
const mysql = require("mysql2");

dotenv.config({path: './.env'});

const app = express(); //starting the server


const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



app.listen(3306, () => {
    console.log("Server started on Port 3306");
});

//com nodemon não precisa ficar parando o servidor, instale!!