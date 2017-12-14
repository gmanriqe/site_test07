
module.exports = function(req, res, next) {    
    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if (req.user && req.user.admin) { //el usuario tiene que estar logiado y ademas tiene que tener el campo admin como verdadero en la bd
        return next();
    }

    //si el usuario no tiene permiso regresa a la pagina del home
    return res.redirect('/');
};
    