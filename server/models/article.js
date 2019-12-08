const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  featured_image: {
    type: String
  },
  userId:{
    type: String
  }
});

const Article = mongoose.model('Article',articleSchema)

module.exports = Article
