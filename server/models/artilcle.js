const mongoose = require('mongoose'),
    { Schema } = mongoose

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },
    content: {
        type: String,
        required: [true, 'insert at least a letter']
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    featured_image: {
        type: String
    }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article