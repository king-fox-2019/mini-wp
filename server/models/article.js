const mongoose = require('mongoose')
const { Schema } = mongoose

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: String,
    content: {
        type: String
    },
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})



const Article = mongoose.model('Article', articleSchema)

module.exports = Article