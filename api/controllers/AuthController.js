/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: (req, res) => {
        res.view('auth/show');
    },
    create: (req, res) => {
        //creando la sesion
    }
};

