const Article = require('../models/article')
const User = require('../models/user')
const mongoose = require('mongoose')

class articleController {
    static getArticles = (req,res,next) => {
        Article.find()
        .then(articles=>res.status(200).json(articles))
        .catch(err=>next(err))
    }
    static getUserArticles = (req,res,next) => {
        Article.find({userId:req.decoded.id})
        .then(articles=>res.status(200).json(articles))
        .catch(err=>next(err))
    }
    static createArticle = (req,res,next) => {
        console.log(req.body)
        User.findById(req.decoded.id)
        .then(user=>{
            return Article.create({
                title:req.body.title,
                content:req.body.content,
                author: user.username,
                featured_image:req.body.featured_image,
                userId:req.decoded.id
            })
        })
        .then(article=>res.status(201).json(article))
        .catch(err=>next(err))
    }
    static deleteArticle = (req,res,next) => {
        console.log(req.body.id)
        Article.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})
        .then(result=>{
            console.log('b')
            res.status(201).json(result)})
        .catch(err=>next(err))
    }
    static updateArticle = (req,res,next) => {
        console.log('A')
        console.log(req.body)
        Article.updateOne({_id:mongoose.Types.ObjectId(req.body.id)},{
            $set:{
                title:req.body.title,
                content:req.body.content,
                featured_image:req.body.featured_image
            }
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>next(err))
    }
}

module.exports = articleController