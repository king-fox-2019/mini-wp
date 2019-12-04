const Article = require('../models/article')

class ArticleController {
    static all(req, res, next) {
        Article.find()
            .populate({
                path: "UserId",
                select: "name email -_id"
            })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
    static create(req, res, next) {
        let { title, content } = req.body
        Article.create({ title, content, UserId: req.UserId })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)
    }
}

module.exports = ArticleController