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
    },

    admin: function(req, res){
        User
            .findOne({id: req.params.id})
            .then(function(user){
                //administrador sera 1 y no administrador 0
                // user.admin = true;
                 // user.admin = false;
                user.admin = req.body.admin == '1';
                user.save().then(function(){
                    res.redirect('/user');
                })
            })
            .catch(function(err){
                console.log(err);
                return res.redirect('/');
            })
    }
};

