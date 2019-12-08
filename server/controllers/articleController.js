const Article = require('../models/article')
const gcsDelete = require('../helpers/gcsDelete')

class ArticleController {

    static create(req, res, next) {
        const { title, content} = req.body
        const userId = req.loggedUser._id
        const imgUrl = req.body.file
        const tags = req.body.tags.split(',')
        Article.create({title, content, userId, imgUrl, tags})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next) 
    }

    static showAll(req, res, next) { 
        Article.find()
            .populate('userId')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static showByTag(req, res, next) {
        // console.log(req.body.tag)
        Article.find({ tags: req.params.tag })
            .populate('userId')
            .then(articles => {
                console.log(articles)
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static showUserArticle(req, res, next) {
        Article.find({userId: req.loggedUser._id})
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static showOne(req, res, next) {
        const _id = req.params.articleId
        Article.findById(_id)
            .then(article => {
                
                res.status(200).json(article)
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update', req.body)
        const { title, content} = req.body
        const userId = req.loggedUser._id
        const imgUrl = req.body.file
        const tags = req.body.tags.split(',')
        const _id = req.params.articleId
        Article.findByIdAndUpdate({_id}, {title, content, userId, imgUrl, tags}, {new: true})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.articleId
        Article.findByIdAndDelete(_id)
            .then(response=> {
                gcsDelete(result.imgUrl)
                res.status(200).json({message: 'success delete'})
            })
            .catch(next)
    }
}

module.exports = ArticleController