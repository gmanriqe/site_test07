/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find:(req, res)=>{
        Book
            .find({
                limit: 20,
                sort: 'createdAt DESC'
            }).exec((err, regs)=>{
                return res.view('books/index',{books:regs});
            })
    },
    findOne:(req, res)=> {
        Book
            .findOne({
                id: req.params.id
            }).exec((err, book)=> {
                if(err) {
                    console.log(err);
                } else {
                    res.view('books/show',{book:book});
                }
            })
    },
    create: function(req, res){
        // 1.guardar registro en la BD y luego guardar el archivo
        // ->2. primero guardar el archivo y luego guarda en la BD
        req.file('fotoUrl').upload({ //'avatar' is name in form
            dirname: '../../assets/images/books/avatars' //router for save avatar
        },(err, files)=>{ //files is array with all data
            if(err) res.negotiate(err);
            // res.send(files);
            var regs = {
                title: req.body.title,
                description: req.body.description,
                page: req.body.page,
                publishedAd: req.body.publishedAd,
            }

            if(files.length > 0) {
                // add json regs
                regs['fotoUrl'] = files[0].fd.split("/").pop();
            }
            Book
                .create(regs, (err, newBook)=>{
                    res.redirect('/book/'+ newBook.id);
                })
        })
    },
    formnew:(req, res)=> {
        return res.view('books/new');
    },
    formedit:(req, res)=> {
        Book
        .findOne({
            id: req.params.id
        }).exec((err, book)=> {
            if(err) {
                console.log(err);
            } else {
                res.view('books/edit',{book:book});
            }
        })
    },
    update: function(req, res){
        var dataActualizar = {};

        if(req.body.title) dataActualizar['title'] = req.body.title;
        if(req.body.description) dataActualizar['description'] = req.body.description;
        if(req.body.page) dataActualizar['page'] = req.body.page;
        if(req.body.publishedAd) dataActualizar['publishedAd'] = req.body.publishedAd;

        req.file('pdfUrl').upload({
            dirname: '../../books/files'
        },(err, files)=>{
            if(err) res.negotiate(err);

            if(files.length > 0){
                dataActualizar['pdfUrl'] = files[0].fd.split("/").pop();
            }

            console.log(dataActualizar);
            Book
                .update({id:req.params.id},dataActualizar)
                .exec((err, libroActualizado)=>{
                    if(err) res.negotiate(err);
                    console.log('libroActualizado');
                    res.view('books/show',{book:libroActualizado[0]});
                })
        })
    },
    delete:(req, res)=> {
        Book
        .findOne({
            id: req.params.id
        }).exec((err, book)=> {
            if(err) {
                console.log(err);
            } else {
                res.view('books/delete',{book:book});
            }
        })
    },
    /*este metodo fue creado para que despues de 
    http://localhost:1337/book/id/delete me redireccion a 
    http://localhost:1337/book */
    destroy:(req, res)=>{
        Book
            .destroy({id: req.params.id}).exec((err)=>{
                return res.redirect('/book');
            })
    }
};

