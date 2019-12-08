const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title:  {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  featured_image: {
    type: String
  }
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo