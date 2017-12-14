/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
module.exports = {
	show: (req, res) => {
        res.view('auth/show');
    },
    create: (req, res) => {
        //creando la sesion con passport
        passport.authenticate('local', function(err,user,extraInfo){ //autenticacion local
            console.log(extraInfo + 'extrainfo');

            if(err || !user) return res.view('auth/show',{});
            
            req.login(user, function(err){
                if(err) return res.view('auth/show',{error: err});
                console.log(user + 'USUARIO');
                return res.view('homepage',{user:user}); //{user:user} es el usuario que se acaba de registrar que le pasamos a la vista 'homepage'

            })
        })(req,res);
    },
    destroy: (req, res) => {
        console.log('voy a cerrar sesion');
        console.log(req.session.passport);
        if(typeof req.session.passport != 'undefined'){
            req.session.passport.user = null;
        }
        res.redirect('/');
    }
};

