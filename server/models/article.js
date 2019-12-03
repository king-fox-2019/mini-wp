const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  title : {
    type : String, 
    required : [true, `Please define the title`]
  },
  content : {
    type : String,
    required : [true, `Content cannot be empty`]
  },
  imgSrc : {
    type : String,
    default : 'https://i.pinimg.com/564x/cf/5e/d8/cf5ed8a8b304e6599de416533fc0d286.jpg'
  },
  tags : [{
    type : String, 
    default : ['womanhood', 'feminism']
  }]
}, {
  timestamps : true
})

const Article = model('Article', articleSchema)

module.exports = Article