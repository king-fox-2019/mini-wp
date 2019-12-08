const { Schema, model } = require('mongoose')

const articleSchema = new Schema (
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        content: {
            type: String,
            required: [true, 'Content is required']
        },
        created_at: Date,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        featured_image: {
            type: Array,
            validate: {
                validator: function (v) {
                    if (v.length > 0) {
                        return true
                    } else {
                        return false
                    }
                },
                message: props => `Image is required`
            }
        },
        tags: {
            type: Array,
            validate: {
                validator: function (v) {
                    if (v.length > 0) {
                        return true
                    } else {
                        return false
                    }
                },
                message: props => `Tag(s) is required`
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Article = model('Article', articleSchema)
module.exports = Article