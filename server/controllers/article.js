const Article = require('../models/Article')
const { dateNow } = require('../helpers/dateNow')
class ArticleController{
    static addArticle(req,res,next){
        let { title, author, content, file} = req.body
        author = req.id
        const created_at = dateNow()
        Article.create({ title, author, content, created_at, image:file})
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)
    }
    static updateArticle(req, res, next){
        let obj = {}
        req.body.title && (obj.title = req.body.title)
        req.body.content && (obj.content = req.body.content)
        req.body.file && (obj.image = req.body.file)
        Article.findOneAndUpdate( {_id : req.params.id },obj,{new : true, runValidators : true})
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(next)
    }
    static addTag(req, res, next){
        const { Tags } = req.body
        Article.updateOne({_id:req.params.id},{$push : { Tags }})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static allArticle(req, res, next){
        Article.find().populate('author').sort({ _id : -1})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static tagArticle(req, res, next){
        Article.find({Tags:req.params.tag}).populate('author').sort({ _id : -1})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static userArticle(req,res,next){
        Article.find({author:req.id}).populate('author').sort({ _id : -1})
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)    
    }
    static detailArticle(req,res,next){
        Article.findOne({_id:req.params.id}).populate('author')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static delete(req, res, next){
        Article.deleteOne({_id:req.params.id})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

}
module.exports = ArticleController