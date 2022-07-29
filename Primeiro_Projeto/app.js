const { response } = require("express");
const express = require("express");
const { request } = require("http");
const { resolve } = require("path");
const {randomUUID} = express("crypto");

app.use(express.json());

const products = []; //array 

/*
* POST => Inserir um dado
* GET => Buscar um/mais dados
* PUT => Alterar um dado
* DELETE => Remover um dado
*/

app.post("/products", (request, response) => {

    const {name, price} = request.body;

    const product = {
        name, 
        price,
        id: randomUUID()
    }

    products.push(product);

    return response.json(product);

});

app.get("/products", (request, response) =>{
    return response.json(products);
})

app.get("/products/:id", (request, response) => {
    const {id } = request.params; 
    const product = products.find(product => product.id === id);
    return response.json(product);
})

app.put("/products/:id", (request, response) => {
    const {id } = request.params; 
    const {name, price} = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...product[productIndex],
        name, 
        price
    }

    return response.json({message: "Produto alterado com sucesso"});
})

app.delete("/products/:id", (request, response) => {
    const {id } = request.params; 

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);
    return response.json({message: "Produto removido com sucesso"});
})

app.listen(3000, () => console.log("Servidor está rodando na porta 3000"));