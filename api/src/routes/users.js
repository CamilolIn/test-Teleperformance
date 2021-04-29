const { User } = require('../models/user');
const server = require('express').Router(); //Import router from express module.
const passport = require('passport');
const controllers = require('../controllers/userController')


server.post('/', controllers.saveStudent);
server.get('/', controllers.getUser )
server.get('/:id', controllers.getCursosUser)


/*********LOGIN ************* */
server.post('/singin', controllers.login);
server.get('/log/logout', controllers.logout);


module.exports = server;