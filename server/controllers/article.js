const Article = require('../models/article')

class ArticleController {
  static findAll(req, res, next) {
    console.log("masuk findall");
    
    let title = req.query.title || ''
    Article.find({title : {$regex:title}}).sort({ createdAt: "desc"  })
    .then(articles => {
      // console.log(articles, "dapet apa article dari database");
      
      res.status(200).json(articles )
    })
    .catch(next)
  }


  static findMyArticle(req, res, next) {
    console.log("masuk find my article")

    Article.find({ user : req.loggedUser._id })
      .then(articles => {
        // console.log(articles, 'ada kan yg article punya user')
        res.status(200).json(articles)
      })
      .catch(next)
    
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Article.findById(id)
    .then(article => {
      res.status(200).json( article )
    })
    .catch(next)
  }

  static create(req, res, next) {
    console.log(req.body);
    const user = req.loggedUser.id
    let { title, content, tags, image } = req.body
    tags = JSON.parse(tags)
    Article.create({ title, content, tags, image, user})
    .then(article => {
      // console.log(article);
      
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
    console.log("MASUK MAU UPDATE DR SERVER INI");
    
    let id = req.params.id
    let { title, content, tags, image } = req.body
    console.log(req.body,  "update dr server")
    Article.findByIdAndUpdate(id, {title, content, tags, image}, { omitUndefined: true, new: true, runValidators: true})
    .then(article => {
      console.log(article, "updated")
      res.status(200).json( {data: article, msg: 'ok'} )
    })
    .catch(next)
  }
}

module.exports = ArticleController