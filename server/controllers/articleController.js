const { Article } = require("../models")
const { ObjectId } = require("mongodb");

class articleController {
    static addArticle(req, res, next) {
      const { title, content, created_at } = req.body;
      Article.create({ title, content, created_at })
        .then(article => {
          res.status(200).json(article);
        }).catch(next)
    }
    
    static showArticles(req, res, next) {
      Article.find({})
        .then(articles => {
          res.status(200).json(articles);
        }).catch(next)
    }

    static showArticle(req, res, next) {
      Article.findById({ _id: ObjectId(req.params.articleId) })
        .then(article => {
          res.status(200).json(article);
        }).catch(next);
    }

    static editArticle(req, res, next) {
      const articleId = req.params.articleId;
      console.log(articleId, '<<')
      const { title, content, created_at } = req.body;
      Article.findByIdAndUpdate(articleId, { title, content, created_at })
        .then(response => {
          res.status(200).json({ message: 'Updated' })
        }).catch(next);
    }

    static editArticleSpecified(req, res, next) {
      const update = {};
      const articleId = req.params.articleId;
      const { title, content, created_at } = req.body;
      if (title) update.title = title;
      if (content) update.content = content;
      if (created_at) update.created_at = created_at;
      Article.findByIdAndUpdate(articleId, update)
        .then(article => {
          res.status(200).json(article)
        })
        .catch(next);

    }

    static deleteArticle(req, res, next) {
      const articleId = req.params.articleId;
      Article.deleteOne({ _id: articleId })
        .then(response => {
          res.status(200).json({ message: 'Deleted' })
        })
        .catch(next)
    }

}

module.exports = articleController;