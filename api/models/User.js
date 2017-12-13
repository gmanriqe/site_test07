/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt-as-promised');
module.exports = {
  tableName: 'User',
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  /* aqui podemos especificar funciones que se van especificar 
  en cierto puntos del proceso de registro a la BD */
  beforeCreate: (user, cb) => { //funcion que lanzaremos antes de crear un usuario en la BD
    bcrypt
      .hash(user.password, 10)
      .then( hash => {
        console.log(hash);
        user.password = hash;
        cb();
      })
      .catch(cb);
        console.log(cb);
      // .catch(err => {
      //   console.log(err);
      //   cb(err);
      // })
      
  }
};

