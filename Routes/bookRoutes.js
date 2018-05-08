var express = require('express');

var routes = function(Book){
  var bookRouter = express.Router(); // use this to define all routes(instance of a router)

  bookRouter.route('/')
    .post(function(req, res) {
      var book = new Book(req.body);

      book.save();
      res.status(201).send(book);
    })
    .get(function(req, res) {
      var query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }

      Book.find(query, function(err, books){
        if(err) {
          res.status(500).send(err);
        }else {
          res.json(books);
        }
      });
      // var responseJson = { hello: 'Hello API'};
      // res.json(responseJson);
    });

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
    res.json(req.book);
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
    req.body.save(function(err){
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  });
  return bookRouter;
};

module.exports = routes;
