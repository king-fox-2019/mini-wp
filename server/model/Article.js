const mongoose = require('mongoose')
const Schema = mongoose.Schema


const articleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }   ,
    featured_image:{
        type: String
    }

})


const Article = mongoose.model('Article', articleSchema)
module.exports = Article


