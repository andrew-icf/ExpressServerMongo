var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
var db = mongoose.connect('mongodb://localhost/bookAPI'); // connecting to Mongo, bookAPI is the name of the db
var Book = require('./models/bookModel'); // create this so that we know what the data will look like
bookRouter = require('./Routes/bookRoutes')(Book); // since it is created as a function we will need to execute it

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({})); // look at the body and see if it has any JSON objects and if it does it will take that JSON obj and add it to the body

app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);

app.get('/', function(req, res) {
  res.send("Welcome to the app");
});

app.listen(port, function() {
   console.log('Gulp is running on PORT: ', port);
});
