const Article = require('../model/article')

class Controller {

    static showAll(req, res, next) {
        Article
            .find()
            .populate("author", "name")
            .then((result) => {
                // console.log(result);
                res.status(200).json(result)
            })
            .catch((next));
    }

    static showOne(req, res, next) {
        Article
            .findById(req.params.id)
            .populate("author", "name")
            .then((result) => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch((next));
    }

    static createArticle(req, res, next) {
        Article
            .create({
                title: req.body.title,
                content: req.body.content,
                author: req.decode.id,
                featured_image: req.body.featured_image
            })
            .then((result) => {
                console.log(result);
                res.status(201).json(result)
            })
            .catch((next));
    }

    static delete(req, res, next) {
        Article
            .findById(req.params.id)
            .then((result) => {
                if (result.author._id == req.decode.id) {
                    return Article.deleteOne({ _id: req.params.id })
                } else {
                    throw ({ status: 403, msg: "you don’t have permission to delete this article." })
                }
            })
            // Article.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((next));
    }

    static update(req, res, next) {
        Article
            .findById(req.params.id)
            .then((result) => {
                if (result.author._id == req.decode.id) {
                    return Article.findByIdAndUpdate(req.params.id, req.body)
                } else {
                    throw ({ status: 403, msg: "you don’t have permission to change this article." })
                }
            })
            // Article.findByIdAndUpdate(req.params.id, {
            //     title: req.body.title,
            //     content: req.body.content
            // })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((next));
    }

}

module.exports = Controller