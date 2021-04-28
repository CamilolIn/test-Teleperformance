const express = require('express');
// const bodyParser = require('body-parser');
const { users, mensajes } = require('./src/routes/index');
const app = express();
const passport = require('passport')
const session = require('express-session')
const http = require('http')
var cors = require('cors')

app.use(cors())
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
// const io = socketio(server)


/*******************Configuracion Socketio********************** */
io.on("connection", socket => {

let nombre;

  socket.on('conectado', (nomb)=> {
    nombre=nomb
    console.log("Useario Conectado", nombre);
    io.emit('mensajes',  {servidor: 'Servidor', mensaje: ''+ nombre+' ha ingresado a la sala'})
  })

  socket.on('mensaje', (nombre, mensaje) => {
    io.emit('mensajes', {
      nombre,
      mensaje
    })
  })

  socket.on('disconnect', () => {
    io.emit('mensajes', {servidor: 'Servidor', mensaje: ''+ nombre+' ha abandonado la sala'})
  } )

  
});

/*******************Configuracion Passport********************** */
require('./src/passport/auth')
app.use(session({
    secret: 'spiralamejorempresa',
    resave: false,
    saveUninitialized: true,
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  /****************************************************************** */



app.use(cors())


app.use(express.json())
app.use('/users', users);
app.use('/mensajes', mensajes);
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});


module.exports = server;