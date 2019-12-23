const Comment = require('../models/comment')

class CommentController{
    static createComment(req,res,next){
        const {content} = req.body
        Comment.create({
            content,
            UserId: req.decoded.id
        })
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(next)
    }

    static getAllComment(req,res,next){
        Comment.find()
            .populate('UserId')
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(next)
    }

    static getOneComment(req,res,next){
        Comment.findOne({
            _id: req.params.id
        })
        .then(comment => {
            if(comment){
                res.status(200).json(comment)
            }else{
                throw({
                    status: 404,
                    message: 'There is no comment with that id'
                })
            }
        })
        .catch(next)
    }

    static editComment(req,res,next){
        const {content} = req.body
        Comment.findOneAndUpdate({
            _id: req.params.id
        },
        {
            content
        },
        {
            new: true
        })
        .then(comment => {
            if(comment){
                res.status(200).json(comment)
            }else{
                throw({
                    status: 404,
                    message: 'There is no comment with that id'
                })
            }
        })
        .catch(next)
    }

    static deleteComment(req,res,next){
        Comment.findOneAndDelete({
            _id: req.params.id
        })
        .then(comment => {
            if(comment){
                res.status(200).json(comment)
            }else{
                throw({
                    status: 404,
                    message: 'There is no comment with that id'
                })
            }
        })
        .catch(next)
    }
}

module.exports = CommentController