const { Article } = require('../models')

class ArticleController {
  static createArticle(req, res, next) {
    const { title, content, featuredImage } = req.body
    const author = req.user._id
    Article.create({
      title,
      author,
      content,
      featuredImage
    })
      .then(article => {
        res.status(201).json({
          title,
          content,
          featuredImage,
          createdAt: article.createdAt
        })
      })
      .catch(next)
  }

  static getAllArticles(req, res, next) {
    Article.find()
      .populate('author', '_id fullName username email')
      .then(articles => {
        res.status(200).json({
          data: articles
        })
      })
      .catch(next)
  }

  static getAllUserArticles(req, res, next) {
    Article.find({ author: req.user._id })
      .then(articles => {
        res.status(200).json({
          data: articles.map(article => {
            return { ...article._doc, author: undefined }
          })
        })
      })
      .catch(next)
  }

  static getOneArticle(req, res, next) {
    Article.findById(req.params.id)
      .populate('author', '_id fullName username email')
      .then(article => {
        if (article) res.status(200).json({ data: article })
        else throw { status: 404, message: 'Article not found' }
      })
      .catch(next)
  }

  static editArticle(req, res, next) {
    const article = req.article
    const { title, content, featuredImage } = req.body
    article.title = title || article.title
    article.content = content || article.content
    article.featuredImage = featuredImage || article.featuredImage
    article
      .save()
      .then(article => {
        res.status(200).json({ data: { ...article._doc, author: undefined } })
      })
      .catch(next)
  }
}

module.exports = ArticleController
