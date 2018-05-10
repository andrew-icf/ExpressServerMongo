var express = require('express');

var routes = function(Book){
  var bookRouter = express.Router(); // use this to define all routes(instance of a router)
  var bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', function(req, res, next){ // next is going to move it on to our .get .put etc
    Book.findById(req.params.bookId, function(err, book){ // this is our .get functionality
      if(err) {
        res.status(500).send(err);
      } else if(book) {
        req.book = book; // setting the book for everything else down stream
        next();
      } else {
        res.status(404).send('No book Found');
      }
    });
  });
  bookRouter.route('/:bookId')
  .get(function(req, res) {
    var returnBook = req.book.toJSON(); // HATEOAS
    returnBook.links = {}; // creates links so that we can build the self link
    var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
    returnBook.links.FliterByGenre - newLink.replace(' ', '%20');
    res.json(returnBook);
  })
  .put(function(req, res) {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save(function(err){
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  })
  .patch(function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for(var key in req.body) {
      req.book[key] = req.body[key];
    }
    req.book.save(function(err){
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  })
  .delete(function(req, res) {
    req.book.remove(function(err) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Book Removed');
      }
    }); // take the book found in the MiddleWare and remove it
  });
  return bookRouter;
};

module.exports = routes;
