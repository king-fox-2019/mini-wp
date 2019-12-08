const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title:  String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content:   String,
  created_at: String,
  Tags : [ String ],
  image : String
});

const article = mongoose.model('Article', articleSchema)

module.exports = article