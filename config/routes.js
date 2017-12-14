//RESTFUL
  //Miembros
    //  GET /book/:id -- Editar
    // PUT /book/:id  -- Actualizar
    // DELETE /book/:id -- ELIMINE
  //Colecciones
    //  GET /book
    // POST /book

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  //Book
  '/book/:id/edit' : { controller: 'BookController', action: 'formedit' },
  '/book/:id/delete' : { controller: 'BookController', action: 'delete' },

  //REGISTRATION
  'GET /signup': { controller: 'RegistrationController', action: 'show'},
  'POST /signup': { controller: 'RegistrationController', action: 'create'},

  //PASSPORT
  'GET /login': { controller: 'AuthController', action: 'show'},
  'POST /login': { controller: 'AuthController', action: 'create'},
  'DELETE /logout': { controller: 'AuthController', action: 'destroy'},
  
  //USER
  'PUT /admin/:id': { controller: 'UserController', action: 'admin'}


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
