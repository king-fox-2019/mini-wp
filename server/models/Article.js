const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title required']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String
    },
    featuredImage: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
)

const Article = model('Article', articleSchema)

module.exports = Article
