const mongoose = require ('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Comment should not be empty!'],
    minlength: [5, 'Please input minimum 5 characters!']
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment