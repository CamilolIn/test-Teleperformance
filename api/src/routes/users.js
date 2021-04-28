const { User } = require('../models/user');
const server = require('express').Router(); //Import router from express module.
const passport = require('passport');


server.post('/', function (req, res) {
	const { email, password, phone, role, name } = req.body;
	console.log(req.body);
	User.create({ name, email, password, role, phone })
		.then((user) => {
			console.log(user);
			return res.status(200).json({
				message: 'Usuario creado exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			return res.status(400).json({
				message: 'Error al crear usuario',
				data: err,
			});
		});
});

// GET USERS
server.get('/', (req, res) => {
	User.findAll({include:{model: Cursos}})
		.then((users) => {
			users.sort(function (a, b) {
				return a.id - b.id;
			});
			return res.status(200).json({
				message: 'Success',
				data: users,
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'Hubo un error en el servidor',
				data: err,
			});
		});
});



// server.put('/:user_id/curso/:mensaje_id', (req, res, next)=>{
// 	console.log(req)
// 	const { user_id, curso_id } = req.params;

// 	Promise.all([ User.findByPk(user_id), Cursos.findByPk(curso_id) ])
// 		.then(data =>{
// 			data[0].addCursos(data[1])
// 				.then(() => {
// 					User.findOne({
// 						where: {id: user_id},
// 						include: [{model:Cursos}]
// 					})
// 						.then((data) => {
// 							console.log(data)
// 							res.json({
// 								message: 'Curso añadida correctamente!', 
// 								data: data 
// 						})
// 				})})
// 				.catch(next)
// 		});
// })

server.get('/:id', (req, res, next) => {
	const { id } = req.params;
	User.findAll({ where: { id }, include: { model: Cursos} }).then((user) => {
		console.log(user);
		res.json({
				data: user,
			})
			.catch((err) => {
				return res.status(400).json({
					message: 'Error al buscar User',
					data: err,
				});
			});
	});
});


/*********LOGIN ************* */
server.post('/singin', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return res.send({data:{ message: 'User or Email incorrect', log:false }});
		}
		if (!user) {
			return res.send({data:{ message: 'User or Email incorrect', log:false }});
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.send({
				data: user,
			});
		});
	})(req, res, next);
});

server.get('/log/logout', (req, res) => {
	req.logOut();
	res.send({ message: 'logout' });
});



module.exports = server;