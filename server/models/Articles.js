const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema ({
    title : {
        type : String,
        
    },
    description : {
        type : String,
        
    },
    publishedAt : {
        type : Date,
        default : new Date
    },
    tags : [{
        type : String
    }],
    images : {
        type : Array
    },
    userId : {
        type : Schema.Types.ObjectId, ref : "User"
    },
    likes : [{
        type : Schema.Types.ObjectId, ref : "User"
    }],
    dislike : [{
        type : Schema.Types.ObjectId, ref : "User"
    }]
})

const Article = mongoose.model('Article',articleSchema)

module.exports = Article
