var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud Test', function() {
  it('should allow a book to be posted and return a read and _id property', function(done){
     var bookPost = {title: 'New Book', author: 'Dude', genre: 'Fiction'};

     agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results){
        results.body.read.shoud.equal(false);
        results.body.should.have.property('_id');
        done(); // lets supertest know that this test is done and move on
      });
  });

  afterEach(function(done){
    Book.remove().exec();
    done();
  });
});
