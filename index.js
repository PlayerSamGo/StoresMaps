const fs = require('fs');
//const config = require('./scripts/setConfig.json');

//Load dependencies 
const mongoose = require('mongoose');
const port = 1200//config.port;

let app = require('./app');

let server = require('http').createServer(app); //Server with express

//Init for start user creation before launch project 

console.log("Inicio de app express exitosa");
//Connection db
//console.log("Conexion a base de datos exitosa");