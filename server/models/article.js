const {Schema, model} = require('mongoose')

const articleSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Please enter todo\'s name.']
    }, 
    content: {
        type: String
    }, 
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

articleSchema.pre('save', function (next) {
    this.created_at = Date.now()
    next()
})

const Article = model('Article', articleSchema)

module.exports = Article