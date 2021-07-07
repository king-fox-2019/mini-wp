const ArticleModel = require('../models/article')

module.exports = {
    findAll(req,res,next){
        ArticleModel.find()
            .populate('author')
            .then(articles=>{
                res.status(200).json(articles)
            })
            .catch(next)
    },
    myArticle(req,res,next){
        ArticleModel.find({ author : req.loggedUser.id })
            .populate('author')
            .then(articles=>{
                res.status(200).json(articles)
            })
            .catch(next)
    },
    create(req,res,next){
        const author = req.loggedUser.id
        const { title, content, image, tag } = req.body
        const form = { title, content, image, author, tag }
        ArticleModel.create(form)
            .then(article=>{
                res.status(201).json({
                    message : 'success create article',
                    data : article
                })
            })
            .catch(next)
    },
    findbytag(req,res,next){
        const { tag } = req.body
        ArticleModel.find({ tag })
            .populate('author')
            .then(articles=>{
                res.status(200).json({
                    message : `find tag :${tag} success`,
                    articles
                })
            })
            .catch(next)
    },
    updatePut(req,res,next){
        const { id } = req.params
        const { title, content, image, tag } = req.body
        const form = { title, content, image, tag }
        ArticleModel.findOneAndUpdate({ _id : id },form,{ new : true, runValidators : true })
            .then(article=>{
                res.status(201).json({
                    message : 'success edit article, title : ' + article.title ,
                    data : article
                })
            })
            .catch(next)
    },
    updatePatch(req,res,next){
        const { id } = req.params
        const { title } = req.body
        const form = { title }
        ArticleModel.findOneAndUpdate({ _id : id },form,{ new : true, runValidators : true })
            .then(article=>{
                res.status(201).json({
                    message : 'success edit title',
                    data : article
                })
            })
            .catch(next)
    },
    deleted(req,res,next){
        const { id } = req.params
        ArticleModel.findOneAndDelete({ _id : id })
            .then(article=>{
                res.status(201).json({
                    message : 'success delete article, title : ' + article.title ,
                    data : article
                })
            })
            .catch(next)
    }
}