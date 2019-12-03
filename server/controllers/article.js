const Article = require('../models/Article')
class ArticleController{
    static show(req, res, next){
        Article.find()
            .then( article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static create(req, res, next){
        const { title, category, created_at, content } = req.body
        Article.create({ title, category, created_at, content })
            .then( data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static update(req, res, next){
        const { id, title, category, content } = req.body
        Article.updateOne({_id:id},{ title, category, content })
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static delete(req, res, next){
        const { id } = req.body
        Article.deleteOne({_id:id })
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}
module.exports = ArticleController