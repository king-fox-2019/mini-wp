const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    content:{
        type: String,
        required: [true, 'Content cannot be empty']
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    featured_image:{
        type: String
    },
    tags: [{
        type: String
    }],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{
    versionKey: false,
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article