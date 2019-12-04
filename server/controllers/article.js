'use strict';
const { Article } = require('../models');

class ArticleController {
    static addArticle(req, res, next) {
        console.log(req.token)
        let { title, content } = req.body
        let newArticle = {
            title,
            content,
            userId: req.token.id
        }
        Article
            .create(newArticle)
            .then(data=> {
                console.log(data)
                res.status(201).json(data)
            })
            .catch(err=> res.status(500).json({ message: "Internal server error" }))
    }
    static showArticle(req, res, next) {
        Article
            .find()
            .sort({ createdAt: -1})
            .populate({
                path: 'userId',
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