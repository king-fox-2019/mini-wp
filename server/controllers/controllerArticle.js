const {Article} = require('../models/modelArticle');

class controllerArticle {
    static viewArticle(req, res, next) {
        Article.find({})
            // .populate("author", "name")
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            })
    }

    static createArticle(req, res, next) {
        Article.create({
            title: req.body.title,
            category: req.body.category,
            // author: req.body.author,
            content: req.body.content,
            quillContent: req.body.quillContent,
            created_at: Date.now()
        })
            .then(result => {
                res.status(200).json({message: "data successfully inserted"});
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = controllerArticle;