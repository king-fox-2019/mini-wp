const Article = require('../models/article')

class ArticleCtrl {

    static getArticle(req, res, next) {
        
        Article.find()
            .sort({created_at:'desc'})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static getArticleByAuthor(req, res, next) {

        Article.find({ author:req.params.authorID })
            .sort({created_at:'desc'})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static getOneArticle(req, res, next) {
        Article.findById(req.params.id)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static createArticle(req, res, next) {
        console.log('fired')
        const {title, content, created_at} = req.body
        const author = req.decodedID
        
        Article.create({
            title,
            content,
            created_at,
            author
        })
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        
        Article.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)

    }

    static editArticle(req, res, next) {
        const {title, content} = req.body
        Article.updateOne({_id: req.params.id}, {title, content})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

}

module.exports = ArticleCtrl