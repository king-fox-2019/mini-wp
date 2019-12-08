'use strict';
const { Article, User } = require('../models');

class ArticleController {
    static showAuthorArticle(req, res, next) {
        let { id } = req.token
        let articlesList = []
        Article
         .find()
         .populate({
             path: 'author',
             select: '-passowrd'
         })
        .then(articles=> {
            let list = []
            articles.forEach(article => {
                if(article.author._id == id) {
                    list.push(article)
                }
            });
            res.status(200).json(list)
        })
        .catch(next)
    }
    static destroy(req, res, next) {
        let { id } = req.body
        Article
            .deleteOne({_id: id})
            .then(succ=> {
                res.status(200).json(succ)
            })
            .catch(next)
    };
    static addArticle(req, res, next) {
        let { title, content } = req.body
        let { id } = req.token
        let newArticle = {
            title,
            content,
            author: id
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
                console.lfilter, updateog(err);
            })
    }
    static edit(req, res, next) {
        Article 
            .updateOne({_id: req.body.id}, { $set: { title: req.body.title, content: req.body.content } })
            .then(result => {
                console.log(result)
                res.status(200).json({ message: 'OK!' })
            })
            .catch(next)            
    }

}

module.exports = ArticleController;