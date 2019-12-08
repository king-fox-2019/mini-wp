const mongoose = require('mongoose'),
    { Schema } = mongoose

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please insert title"]
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    content: String,
    UserId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article