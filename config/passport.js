var passport = require('passport'),
    bcrypt = require('bcrypt-as-promised'),
    LocalStrategy = require('passport-local').Strategy;
//manejo de promesas que no existen en las promesas nativas de nodeJS
//reemplazando las promesas nativas
Promise = require('bluebird');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(email, password, done){
    //mi primera promesa guardada en una variable
    let promiseFindUser = User.findOne({email: email});
    //mi segunda promesa, comparacion del password del usuario con el password de bcrypt
    let promiseHashEquals = promiseFindUser.then(function(user){
        if(!user) return false;
        return bcrypt.compare(password, user.password)
    });

    //haciendo uso de blubird
    Promise
        .all([promiseFindUser,promiseHashEquals])
        //spread = then con la diferencia que lo que debe de cumplirse es un arreglo y que puedas recibir lo que retorna cada promesa para luego ser juntada y recibida en una sola funcion (en el mismo orden)(spread usalo cuando vas a recibir 2 promesas que en este caso es [promiseFindUser,promiseHashEquals]))
        .spread(function(user, passwordCorrect){
            console.log(user);
            console.log(passwordCorrect);
            if(!user || !passwordCorrect) return done(null, false,{ message: "Usuario no encontrado o password incorrecto"});

            let returnUser = {
                email: user.id,
                id: user.id,
                createdAt: user.createdAt
            };

            return done(null,returnUser, {message: "Bienvenido."}) //null por que viene sin errores
        })
        .catch( err => done(err, false, {message: err})); //solo tendras una sola promesa con spread
}))

