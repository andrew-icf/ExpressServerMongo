// A JSON object that lays out what a Book looks like
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
   title: {type: String},
   author: {type: String},
   genre: {type: String},
   read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);
