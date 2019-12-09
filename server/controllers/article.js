const Article = require('../models/article')

class ArticleController {
  static findAll(req, res, next) {
    let topic = req.query.topic || ''
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
    let filter = {}
    if (topic && topic !== 'all') {
      filter['tags.key'] = `${topic}`
    }
    if (req.loggedUser) {

      filter.user = req.loggedUser._id
    }
    let count

    Article.countDocuments(filter)
      .then(n => {
        count = n
        return Article.find(filter).skip(limit * (page - 1)).limit(limit).sort({ createdAt: "desc" })
      })
      .then(articles => {
        res.status(200).json({ count, articles })
      })
      .catch(next)

  }

  static findOne(req, res, next) {
    let id = req.params.id
    Article.findById(id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const user = req.loggedUser.id
    let { title, content, tags, image } = req.body
    tags = JSON.parse(tags)
    Article.create({ title, content, tags, image, user })
      .then(article => {

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
    let { title, content, tags, image } = req.body
    Article.findByIdAndUpdate(id, { title, content, tags, image }, { omitUndefined: true, new: true, runValidators: true })
      .then(article => {
        res.status(200).json({ data: article, msg: 'ok' })
      })
      .catch(next)
  }
}

module.exports = ArticleController