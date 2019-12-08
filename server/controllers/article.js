const Article = require('../models/Article');

class ArticleController {
    static create(req, res, next) {
        const { title, content, tags } = req.body;
        Article
            .create({
                title, 
                content,
                tags,
                user: req.decoded.id
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Article
            .findById(req.params.id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static showAll(req, res, next) {
        let query;
        if (req.query.trash) {
            let trashStatus = JSON.parse(req.query.trash)
            query = {trashStatus}
        } else {
            query = {}
        }

        Article
            .find(query)
            .then( datas => {
                let filtered = datas.filter(function(item) {
                    return item.user == req.decoded.id;
                });
                res.status(200).json(filtered);
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const { title, content, tags } = req.body;
        Article
            .findOneAndUpdate({_id: req.params.id}, { title, content, tags }, {returnOriginal: false})
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Article
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                if (!data) {
                    let err = {
                        status: 400,
                        msg: 'data not found.'
                    }
                    next(err);
                }
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static uploadFile(req, res, next) {
        let imageURL = req.body.image;
        res.status(201).json({
            image: imageURL
        })
    }

    static trashStatus(req, res, next) {
        if (typeof req.body.trash === 'undefined') {
            let err = {
                status: 400,
                msg: 'Trash status is required'
            }
            next(err);
        } else {
            const trashStatus = JSON.parse(req.body.trash);
            Article
            .findOneAndUpdate({_id: req.params.id}, { trashStatus }, {returnOriginal: false})
            .then( data => {
                res.status(200).json(data);
            })
            .catch( err => {
                next(err);
            })
        }
    }
}

module.exports = ArticleController;