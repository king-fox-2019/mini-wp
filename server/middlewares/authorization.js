const Article = require('../models/article')
const Comment = require('../models/comment')

module.exports = {
    article(req,res,next){
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            if(article){
                if(article.author == req.decoded.id){
                    next()
                }else{
                    next({
                        status: 403,
                        message: 'You dont have permission to do action'
                    })
                }
            }else{
                next({
                    status: 404,
                    message: 'There is no article with that id'
                })
            }
        })
        .catch(next)
    },
    comment(req,res,next){
        Comment.findOne({
            _id: req.params.id
        })
        .then(comment => {
            if(comment.UserId == req.decoded.id){
                next()
            }else{
                next({
                    status: 403,
                    message: 'You dont have permission to do action'
                })
            }
        })
        .catch(next)
    }
}