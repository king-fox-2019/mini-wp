const ArticleModel = require('../models/article')

module.exports = {
    findAll(req,res,next){
        ArticleModel.find({ author : req.loggedUser.id })
            .populate('author')
            .then(articles=>{
                res.status(200).json(articles)
            })
            .catch(next)
    },
    create(req,res,next){
        const author = req.loggedUser.id
        const { title, content, imageUrl } = req.body
        const form = { title, content, imageUrl, author }
        ArticleModel.create(form)
            .then(article=>{
                res.status(201).json({
                    message : 'success create article',
                    data : article
                })
            })
            .catch(next)
    },
    updatePut(req,res,next){
        const { id } = req.params
        const { title, content, imageUrl } = req.body
        const form = { title, content, imageUrl }
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