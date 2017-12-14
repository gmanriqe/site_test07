/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        User
            .find({sort:'createdAt DESC'})
            .then(function(users){
                return res.view('users/index',{users:users});
            })
            .catch(function(err){
                console.log(err);
                return res.redirect('/');
            })
    }
};

