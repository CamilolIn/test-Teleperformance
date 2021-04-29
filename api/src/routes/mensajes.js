const { Mensajes } = require('../models/mensajes');
const server = require('express').Router();
const controllersM = require('../controllers/mensajesController')

server.post('/', controllersM.createMessage );


module.exports = server;