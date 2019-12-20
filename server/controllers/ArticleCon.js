'use strict'
const Article = require('../models/Article')

class ArticleCon
 {

    static findAll(req, res, next){
        Article.find()
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        let id = req.params.id
        Article.findById(id)
        .then(article => {
            res.status(200).json(article)
        })
        .catch(next)
    }

    static addArticle(req, res, next){
        console.log(req.body,'ini req body')
        const star = false
        const author = req.user.name
        let img = ''
        if(req.body.img){
            img = req.body.img
        }
        let created_at = '' 
        if(!req.body.created_at){
            created_at = new Date()
        }else{
            created_at = req.body.created_at
        }
        const {title, content} = req.body 
        const user_id = req.user._id  
        Article.create({title, content, author, created_at, star, img,user_id})
        .then(article =>{
            res.status(201).json(article)
        })
        .catch(next)
    }

    static deleteArticle(req, res, next){
        const id = req.params.id      
        Article.deleteOne({_id : id})
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static updateArticle(req, res, next){
        const id = req.params.id
        let created_at = new Date()
        if(req.body.created_at){
            created_at = req.body.created_at
        }
        const {title, content} = req.body 
         
        Article.updateOne({_id : id}, {title, content, created_at})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateStar(req, res, next){
        const id = req.params.id
        let star = false
        if(req.body.star === 'star'){
             star = true
        }
        Article.updateOne({_id : id}, {star})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ArticleCon
