const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: String
},{
    timestamps:true
})

module.exports = mongoose.model("Article", ArticleSchema)