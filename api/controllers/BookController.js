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
    formnew:(req, res)=> {
        return res.view('books/new');
    }
};

