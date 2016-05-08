var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Quote = new Schema({
  	author: {
      type : String, trim: true
    },
  	quote: {
      type : String, trim: true
    }
})

module.exports = mongoose.model('quotes', Quote);
