const Article = require('../models/article')

class ArticleController{
    static createArticle(req,res,next){
        const {title, content, featured_image, tags, status} = req.body
        Article.create({
            title,
            content,
            featured_image,
            author: req.decoded.id,
            status,
            tags 
        })
        .then(article => {
            res.status(201).json(article)
        })
        .catch(next)
    }

    static getOneArticle(req,res,next){
        Article.findOne({
            _id: req.params.id
        })
        .populate('author')
        .then(article => {
            if(!article){
                throw({
                    status: 404,
                    message: 'There is no article with that id'
                })
            }else{
                res.status(200).json(article)
            }
        })
        .catch(next)
    }

    static getAllArticlePublish(req,res,next){
        Article.find({
            status: 'publish'
        })
        .populate('author')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static getAllArticleDraft(req,res,next){
        Article.find({
            status: 'draft'
        })
        .populate('author')
        .then(articles => {
            let arr = []
            articles.forEach(data => {
                if(data.author._id == req.decoded.id){
                    arr.push(data)
                }
            })
            res.status(200).json(arr)
        })
        .catch(next)
    }

    static likeArticle(req,res,next){
        Article.findOne({
            _id: req.params.id
        })
        .then(article => {
            if(article){
                if(article.likes.includes(req.decoded.id)){
                    article.likes.pull(req.decoded.id)
                    article.save()
                    res.status(200).json(article)
                }else{
                    return Article.findOneAndUpdate({
                        _id: req.params.id
                    },
                    {
                        $push : { likes : req.decoded.id}
                    },
                    {
                        new: true
                    })
                }
            }else{
                throw({
                    status: 404,
                    message: 'There is no article with that id'
                })
            }
        })
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static editArticle(req,res,next){
        let data = {}
        for (const index in req.body){
            data[index] = req.body[index]
        }
        Article.findOneAndUpdate({
            _id: req.params.id
        },data,
        {
            new: true
        })
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static deleteArticle(req,res,next){
        Article.findOneAndDelete({
            _id: req.params.id
        })
        .then(article => {
            if(article){
                res.status(200).json({
                    message: 'Delete Article Success'
                })
            }else{
                throw({
                    status: 404,
                    message: 'There is no article with that id'
                })
            }
        })
        .catch(next)
    }
}

module.exports = ArticleController