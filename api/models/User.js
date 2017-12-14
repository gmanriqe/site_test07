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
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  /* aqui podemos especificar funciones que se van especificar 
  en cierto puntos del proceso de registro a la BD */
  beforeCreate: (user, cb) => { //funcion que lanzaremos antes de crear un usuario en la BD
    let bcryptPromise = bcrypt.hash(user.password, 10)
    let userCountPromise = User.count({});

    Promise
      .all([bcryptPromise, userCountPromise])
      .then(function([hash,userCount]){
        user.password = hash;
        // user.admin = true //cuando es el primero
        user.admin = true //cuando es 1,2,3, el primero es false
        user.admin = userCount == 0;

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

