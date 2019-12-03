const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ArticleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'title is required']
    },
    content : {
        type : String
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    imageUrl : {
        type : String,
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Article',ArticleSchema)