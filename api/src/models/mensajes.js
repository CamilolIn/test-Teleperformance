const {db} =  require('../db') 
var Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
const S = Sequelize;
const {User} = require('./user')
 

const Mensajes = db.define('mensajes', {
    mensajeData:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    from: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

},{
  timestamps: true
});

User.belongsToMany(Mensajes, { through: 'User_Mensaje' });
Mensajes.belongsToMany(User, { through: 'User_Mensaje' });


module.exports = {Mensajes}