var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var humanSchema = new Schema({
    name   : String
  , age    : Number

});

module.exports = mongoose.model('humans', humanSchema);
