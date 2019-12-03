'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    content: String,
    createdAt: Date
});

ArticleSchema.pre('save', function(next){
    let article = this
    article.createdAt = new Date().toISOString();
    next()
})

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;