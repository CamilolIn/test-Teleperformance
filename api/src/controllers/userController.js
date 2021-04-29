const { User } = require('../models/user');
const passport = require('passport');

const controllers = {

    //GUARDAR USUSARIO
    saveStudent:function (req, res) {
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
    },

    //OBTENER USUARIO
    getUser:function (req, res) {
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
    },

    getCursosUser:function(req, res, next) {
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
    },

    login: function (req, res, next) {
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
    },

    logout:function (req, res) {
        req.logOut();
        res.send({ message: 'logout' });
    }

}

module.exports =  controllers


