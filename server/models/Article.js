const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestampsPlugin = require('mongoose-timestamp')

const articleSchema = new Schema({
   title: {
      type: String,
      required: true,
      validate: {
         validator: function(v) {
            return /^[-\w\.\$@\*\!]{1,30}$/.test(v)
         }
      }
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

})

articleSchema.plugin(timestampsPlugin)

articleSchema.pre('save', function(next) {
   this.slug = this.title.split(' ').join('-')
   next()
})

const Article = mongoose.model('article', articleSchema)

module.exports = Article