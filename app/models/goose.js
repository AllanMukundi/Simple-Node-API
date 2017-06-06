var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gooseSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Goose', gooseSchema);
