const Article = require('../models/article')
const deletegcs = require('../helpers/deletegcs')

class ArticleController {
    static create(req, res, next) {
        let { title, content, imgUrl, tags } = req.body
        let created_at = new Date
        let author = req.loggedUser.id
        let featured_image = imgUrl
        console.log(featured_image)
        Article.create({ title, content, created_at, author, featured_image, tags })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        let searchQuery = {}
        if(req.query.title || req.query.tags) {
            searchQuery = {
                $or: []
            }
            if(req.query.title) {
                searchQuery.$or.push({'title': new RegExp(`${req.query.title}`, 'gi')})
            }
            if(req.query.tags) {
                searchQuery.$or.push({'tags': new RegExp(`${req.query.tags}`, 'gi')})
            }
        }
        Article.find(searchQuery)
            .populate('author')
            .then(articles  => {
                res.status(200).json(articles )
            })
            .catch(next)
    }

    static readUserArticle(req, res, next) {
        Article.find({ author: req.loggedUser.id })
            .populate('author')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        let { id } = req.params
        Article.findById(id)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let { id } = req.params
        let { title, content, tags, remove, imgUrl } = req.body
        let created_at = new Date
        Article.findById(id)
            .then(article => {
                if(article) {
                    let featured_image = []
                    article.featured_image.forEach(oldImage => {
                        if(remove.indexOf(oldImage) == -1) {
                            featured_image.push(oldImage)
                        }
                    })
                    imgUrl.forEach(newImage => {
                        featured_image.push(newImage)
                    })

                    if(remove) {
                        let removedImages = []
                        if(typeof remove == 'string') {
                            removedImages.push(remove)
                        } else {
                            removedImages = remove
                        }
                    }
                    return Article.findByIdAndUpdate(id, {$set: {title, content, created_at, featured_image, tags }}, { runValidators: true, omitUndefined: true, new: true })
                } else {
                    throw({ status: 404, message: 'Article not found' })
                }
            })
       
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static deleteArticle(req, res, next) {
        let { id } = req.params
        Article.findById(id)
            .then(result => {
                if(result) {
                    result.featured_image.forEach(image => {
                        deletegcs(image)
                    })
                    return Article.deleteOne({ _id: id })
                } else {
                    throw({ status: 404, message: 'Article not found' })
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = ArticleController