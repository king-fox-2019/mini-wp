const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestampsPlugin = require('mongoose-timestamp')

const articleSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   slug: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   image: String,
   audience: {
      type: String,
      required: true,
      default: 'private'
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
})

articleSchema.plugin(timestampsPlugin)

const Article = mongoose.model('article', articleSchema)

module.exports = Article