const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    draft: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    slug: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [{
        type: String
    }]
}, { timestamps: true })

articleSchema.pre('save', function (next) {
    this.slug = this.title.split(" ").join("-")
    next()
})

const Article = model('Article', articleSchema)

module.exports = Article