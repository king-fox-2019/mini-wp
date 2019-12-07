'use strict'

const { Schema, model, models } = require('mongoose')

const articleShema = new Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  content: {
    type: String,
  },
  created_at: {
    type: Date
  },
  status: {
    type: String
  }
})

const Article = model('Article', articleShema)

module.exports = Article