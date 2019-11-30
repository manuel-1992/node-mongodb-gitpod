const express = require('express');
const app = require('./app');
require('./database');
const color = require('colors')





app.listen(3000);
console.log(color.yellow('Servidor en el puerto 3000'));





