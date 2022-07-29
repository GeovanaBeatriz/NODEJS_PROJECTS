const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body. passwordConfirm;

    db.query('SELECT email FROM Usuario where email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.lenght > 0){
            return res.render('register', {
                message: 'That email is already in use'
            })
        }else if(password !== passwordConfirm){

            return res.render('register', {
                message: 'Passwords do not match'
            })
        }


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO Usuario SET ?', {Firstname:name, Email: email, Senha: hashedPassword}, (error, results)=>{
            if(error){
                console.log(error);
            } else{
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                })
            }
        } )
    });
}