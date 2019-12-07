const Article = require('../models/artilcle')

class ArticleController {
    static all(req, res, next) {
        Article.find()
            .populate('author', 'email -_id')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
    static create(req, res, next) {
        let { title, content } = req.body
        Article.create({ title, content , author: req.loggedUserId })
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        Article.findOneAndDelete({_id: req.params.id})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static patch(req, res, next) {
        let { content } = req.body
        Article.updateOne({_id: req.params.id}, { content })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = ArticleController