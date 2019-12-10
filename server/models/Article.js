const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title : {
        type : String,
        required : [true, "article's title required"]
    },
    content : {
        type : String,
        minlength : [100, "minimum character is 100"],
        required : [true, "content required"]
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    featured_image : {
        type : String,
        required :[true, "image required"]
    },
    tags : [{
        type : String,
        required : [true, "tags required"]
    }]
},{ timestamps : true, versionKey :false })

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article
