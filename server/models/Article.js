const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    category: String,
    created_at: String,
    content: String
})

const Article = mongoose.model('Article',ArticleSchema)
module.exports = Article