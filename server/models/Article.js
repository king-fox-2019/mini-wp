const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: {
    type: Date,
    default: new Date()
  }
})

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;