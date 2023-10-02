const express = require('express');
const app = express();
const rotas = require('./roteador');
const port = 3000;


app.use(express.json());
app.use(rotas);


app.listen(port);