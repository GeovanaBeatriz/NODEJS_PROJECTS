const { Console } = require('console');
const http = require('http');
const hostname = '192.168.0.1';
const port = 3000;

/*
const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/pain');
    res.end('Olá da Geovana Beatriz!');
});

server.listen(port,hostname, ()=>{
    Console.log('Servidor rodando!');
});*/

const express = require('express');
const app = express();
const path = require('path'); //caminhos
const router = express.Router();


router.get('/', function(req,res){

    res.sendFile(path.join(__dirname+'/index.hmtl')); //Falando que quando o usuário acessar o index, irá abrir o arquivo index.html
});

router.get('/sobre', function(req,res){

    res.sendFile(path.join(__dirname+'/sobre.hmtl')); //Falando que quando o usuário acessar o sobre, irá abrir o arquivo sobre.html
});


app.use('/', router);

app.listen(process.env.port || 3000);
console.log('Servidor rodando!');
