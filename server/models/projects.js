const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema ({
    title : {
        type : String,
        
    },
    description : {
        type : String,
        
    },
    publishedAt : {
        type : Date,
        default : new Date
    },
    tags : [{
        type : String
    }],
    images : {
        type : Array
    },
    userId : {
        type : Schema.Types.ObjectId, ref : "User"
    }
})

const Project = mongoose.model('Project',projectSchema)

module.exports = Project
