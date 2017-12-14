/**
 * RegistrationController
 *
 * @description :: Server-side logic for managing registrations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: (req, res)=> {
        //mostrar el formulario
        res.view('registration/show')

    },
    create: (req, res)=> {
        //no podemos tener dos usuario con el mismo correo
        User
            .findOne({email: req.body.email})
            .then(user => {
                //si el usuario existe
                if(user) return res.view('registration/show',{error: 'Ya existe este correo'});
                //sino existe
                return User
                    .create({ email: req.body.email, password: req.body.password})
                    .then(u => {
                        req.login(u, function(err){
                            if(err) return res.view('auth/show',{error: err});
                            return res.view('homepage',{user:u}); //{user:u} es el usuario que se acaba de registrar que le pasamos a la vista 'homepage'
            
                        });
                    })
            })
            .catch(function(err){
                console.log(err);
                return res.view('registration/show',{
                    error: error
                })
            })
    }
};

