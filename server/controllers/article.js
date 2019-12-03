'use strict';
const { Article } = require('../models');

class ArticleController {
    static addArticle(req, res, next) {
        let { title, content } = req.body
        let newArticle = {
            title,
            content
        }
        Article
            .create(newArticle)
            .then(data=> {
                console.log(data)
                res.status(201).json(data)
            })
            .catch(err=> res.status(500).json({ message: "Internal server error" }))
    }
    // static addArticle(req, res, next) {
    //     let { title, content } = req.body;
    //     let articleNew = {
    //         title,
    //         content
    //     };
    //     Article
    //         .create(articleNew)
    //             res.status(201).json(data)
    //         })
    //         .catch(err=>{
    //             res.status(500).json({ message: "Internal server error" })
    //         })
    // }
    static showArticle(req, res, next) {
        Article
            .find()
            .then(articles=> {
                res.status(200).json(articles)
            })
            .catch(err=> {
                console.log(err)
            })
    }

}

module.exports = ArticleController;