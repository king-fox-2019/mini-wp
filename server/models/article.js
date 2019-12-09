const { Schema, model, models } = require('mongoose')


const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is requried']
  },
  author: {
    type: Schema.Types.ObjectId,
		required: [true, 'Author id is required'],
    ref: 'User'
  }
})


const Article = model('Article', articleSchema)


module.exports = { Article }
