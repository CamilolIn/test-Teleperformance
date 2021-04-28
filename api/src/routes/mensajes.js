const { Mensajes } = require('../models/mensajes');
const server = require('express').Router();

server.post('/', function (req, res) {
	const { mensajeData, from} = req.body;
	console.log(req.body);
	Mensajes.create({ mensajeData, from })
		.then((mensaje) => {
			console.log(mensaje);
			return res.status(200).json({
				message: 'Mensaje creado exitosamente!',
				data: mensaje,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				message: 'Error al crear Mensaje',
				data: err,
			});
		});
});



module.exports = server;