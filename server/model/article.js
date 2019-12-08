const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: "title is required"
    },
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    featured_image: {
        type: String,
        default: ''
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Article", ArticleSchema)