const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content:{
        type: String
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    versionKey: false,
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment