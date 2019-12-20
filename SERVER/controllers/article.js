const Article = require('../models/Article')
const Comment = require('../models/Comment')

class ControllerArticle {
  static async add(req, res, next) {
    try {
      const { title, content, featured_image, tags } = req.body

      let author = req.loggedUser.id

      let article = await Article.create({
        title, content, featured_image, tags, author
      })

      res.status(201).json({
        message: 'Successfully published an article!', article
      })
    }
    catch (error) {
      next(error)
    }
  }

  static async fetchAll(req, res, next) {
    try {
      let articles = await Article.find()
        .populate('author')
        .sort({ createdAt: 'desc' })

      res.status(200).json(articles)
    }
    catch (error) {
      next(error)
    }
  }

  static async fetchOne(req, res, next) {
    try {
      let article = await Article
        .findById(req.params.id)
        .populate('author')
        .populate('comments')

      res.status(200).json(article)
    }
    catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { title, content, featured_image, tags } = req.body

      let article = await Article
        .findByIdAndUpdate(req.params.id,
          { title, content, featured_image, tags }, { new: true, omitUndefined: true }
        )

      res.status(200).json({
        message: 'Updated an article!', article
      })
    }
    catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let article = await Article.findByIdAndDelete(req.params.id)

      res.status(200).json({
        message: 'Deleted an article!', article
      })
    }
    catch (error) {
      next(error)
    }
  }

  static async addComment(req, res, next) {
    try {
      const { content } = req.body
      const article = req.params.id

      // console.log('ini article content di addComment', content);

      let comment = await Comment.create({
        content, article, commenter: req.loggedUser.id
      })

      res.status(201).json({
        message: 'Posted a comment!', comment
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerArticle

