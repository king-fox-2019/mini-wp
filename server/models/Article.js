const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const articleSchema = new Schema({
  title: String,
  content: String,
  created_at: {
    type: Date,
    default: new Date()
  }
})

const Article = model("Article", articleSchema);
module.exports = Article;