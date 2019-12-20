const mongoose = require ('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title should not be empty!'],
    minlength: [5, 'Please input minimum 5 characters!']
  },
  content: {
    type: String,
    required: [true, 'Post should not be empty!'],
    minlength: [15, 'Please input minimum 15 characters!']
  },
  featured_image: {
    type: String
  },
  slug: {
    type: String
  },
  tags: [{
    type: String
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)
module.exports = Article