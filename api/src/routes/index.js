const router = require('express').Router();
const { Mensajes } = require('../models/mensajes');
const { User } = require('../models/user');


module.exports = {
  users: require('./users'),
  mensajes: require('./mensajes'),
};