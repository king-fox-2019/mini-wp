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
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const Article = model('Article', articleShema)

module.exports = Article