const Article = require('../models/Articles')

class ArticleController {

    static addLikes(req,res,next){
        Article.findOne({_id : req.params.id})
        .then(article => {
            if(article) {
                if(article.likes.indexOf(req.loggedUser._id) > -1 ){
                    return Article.updateOne(
                        { _id : req.params.id},
                        { $pull: { likes : req.loggedUser._id}}
                    )
                }else{
                    return Article.updateOne(
                        {_id: req.params.id},
                        { $addToSet : { likes : req.loggedUser._id}}
                    )
                }
            }
        })
        .then(like => { 
            res.status(200).json({message : 'like updated'})
        })
        .catch(err => {
            next(err)
        })
    }

    static createArticle(req,res,next){
        Article.create({
            title : req.body.title,
            description : req.body.description,
            tags : req.body.tags,
            userId : req.loggedUser._id,
            images: req.body.existing,
            images: req.body.files,
            
        })
        .then(article => {
            console.log(article)
            res.status(200).json(article)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static findByUserId(req,res,next){
        Article.find({
            userId : req.loggedUser._id
        })
        .sort({publishedAt : -1})
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            next()
            console.log(err)
        })
    }

    static findOne(req,res,next){
        Article.findOne({
            _id:req.params.id
        })
        
        .then(article => {
           
            res.status(200).json(article)
        })
        .catch(err =>{
            next()
            
        })

    }

    static showAll(req,res,next){ 
        
        Article.find()
                .populate('userId')
                .sort({publishedAt : -1})
                .then(articles => {
                    res.status(200).json(articles)
                })
                .catch(err => {
                    next(err)
                })
        }

    static deleteArticle(req,res,next){
        Article.findOneAndDelete({
            _id : req.params.id
        })
        .then(article => { 
            res.status(200).json({message : `succesfully delete projects : ${project.title}`})
        })
        .catch(next)
    }

    static updateArticle(req,res,next){
        // console.log(req.body)
        const {id} = req.params
        let images = req.body.files || []
        if(typeof req.body.existing == 'string'){
            images.push(req.body.existing)
        }else{
            for(let i = 0 ; i < req.body.existing.length; i++){
                images.push(req.body.existing[i])
            }
        }
        console.log(images)

        Article.findOneAndUpdate({_id:id}, 
            {
                title : req.body.title,
                description : req.body.description,
                tags : req.body.tags,
                images : images,
            }
            , {new : true})
            .then(article => {
                if(!article){
                    res.status(404).json({message : 'article is not found'})
                }else{
                    res.status(200).json(article)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    
}

module.exports = ArticleController