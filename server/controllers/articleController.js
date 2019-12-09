'use strict';

const Article = require('../models/article');

class articleController {

    static create = (req, res, next) => {
        Article.findOne({
            $and: [
                { title: req.body.title },
                { author: req.userId }
            ]
        })
            .then(article => {
                if (article) {
                    throw new Error('article title already exists in database !!!')
                }
                else {
                    const articleData = {
                        title: req.body.title,
                        content: req.body.content,
                        author: req.userId,
                        featured_image: req.body.featured_image || 'Not Provided'
                    }
                    Article.create(articleData)
                        .then(article => {
                            res.status(201).json(article)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    static getAll = (req, res, next) => {
        Article.findAll({
            author: req.userId
        })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static edit = (req, res, next) => {
        const articleData = {
            title: req.body.title,
            content: req.body.content,
            author: req.userId,
            featured_image: req.body.featured_image || 'Not Provided'
        }
        Article.updateOne({
            _id: req.params.articleId
        }, articleData)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static patch = (req, res, next) => {

    }

    static remove = (req, res, next) => {
        Article.destroy({
            _id: req.params.articleId
        })
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
}

module.exports = articleController;