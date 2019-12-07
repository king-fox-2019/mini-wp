'use strict';
const { Article } = require('../models');

class ArticleController {
    static addArticle(req, res, next) {
        let { title, content } = req.body
        let newArticle = {
            title,
            content,
            author: req.token.id
        }
        Article
            .create(newArticle)
            .then(data=> {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static showArticle(req, res, next) {
        Article
            .find()
            .sort({ createdAt: -1})
            .populate({
                path: 'author',
                select: '-email -password'
            })
            .then(articles=> {
                res.status(200).json(articles)
            })
            .catch(err=> {
                console.log(err)
            })
    }
    static edit(req, res, next) {
        let filter = { _id: req.body.id }
        let update = { title: req.body.title, content: req.body.content }
        Article 
            .findByIdAndUpdate(filter, update)
            .then(result => {
                res.status(200).json({ message: 'OK!' })
            })
            .catch(err => {
                console.log(err)
            })            
    }

}

module.exports = ArticleController;