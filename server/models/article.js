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
        type : Array,
        validate : {
            validator : function(v){
                return v.length > 0 ? true : false
            },
            message: props => `image is required`
        }
    },
    tag : {
        type : Array,
        validate : {
            validator : function(v){
                if (v.includes('')) {
                    return false
                }
                return v.length > 0 ? true : false
            },
            message: props => `tag is required`
        }
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Article',ArticleSchema)