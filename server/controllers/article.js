const Article = require('../models/article')

class ArticleController {
  static findAll(req, res, next) {
    let title = req.query.title || ''
    Article.find({title : {$regex:title}}).sort({ created_at: "desc"  })
    .then(article => {
      res.status(200).json(article)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Article.findById(id)
    .then(article => {
      res.status(200).json({ article })
    })
    .catch(next)
  }

  static create(req, res, next) {
    console.log(req.body);
    
    let { title, content, tags} = req.body
    let imgSrc = req.body.file
    Article.create({ title, content, tags, imgSrc})
    .then(article => {
      console.log(article);
      
      res.status(201).json(article)
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Article.findByIdAndDelete(id)
    .then(article => {
      res.status(200).json(article)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let { title, content, tags, imgSrc } = req.body
    console.log(req.body)
    Article.findByIdAndUpdate(id, { $set : {title, content, tags, imgSrc}}, { omitUndefined: true, new: true, runValidators: true})
    .then(article => {
      console.log(article)
      res.status(200).json( {data: article, msg: 'ok'} )
    })
    .catch(next)
  }
}

module.exports = ArticleController