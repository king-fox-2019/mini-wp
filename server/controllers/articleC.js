const Article = require('../model/article')

class Controller {

    static showAll(req, res, next){
        Article.find()
        .then((result) => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err.message));
    }

    static showOne(req, res, next){
        Article.findById(req.params.id)
        .then((result) => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err.message));
    }

    static createArticle(req, res, next){
        Article.create({
            title: req.body.title,
            content: req.body.content
        })
        .then((result) => {
            console.log(result);
            res.status(201).json(result)
        })
        .catch((err) => res.status(500).json(err.message));
    }

    static delete(req, res, next){
        Article.deleteOne({_id: req.params.id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err.message));
    }

    static update(req, res, next){
        Article.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err.message));
    }

}

module.exports = Controller