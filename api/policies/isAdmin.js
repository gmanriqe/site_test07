
module.exports = function(req, res, next) {    
    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if (req.user && true) {
        return next();
    }

    //si el usuario no tiene permiso regresa a la pagina del home
    return res.redirect('/');
};
    