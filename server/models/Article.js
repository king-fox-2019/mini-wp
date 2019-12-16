'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ArticleSchema = new Schema({
    title: {
        type:String,
        required:[true,'you must enter your title']
    },
    content: String,
    author:String,
    created_at: Date,
    star: Boolean,
    img:String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

const Model = mongoose.model('Article', ArticleSchema)
module.exports = Model