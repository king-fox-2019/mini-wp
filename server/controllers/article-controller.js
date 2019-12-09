const { Article } = require('../models')


class ArticleController {
   static getAllArticles(req, res, next) {
     Article.find({ author: req.user._id })
       .then(function (articles) {
         res.json(articles)
       })
       .catch(next)
  }

  static createNewArticle(req, res, next) {
		const { title, description } = req.body
		const author = req.user._id

    Article.create({ title, description, author })
      .then(function (article) {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static deleteArticle(req, res, next) {
		const { articleId } = req.query

		Article.findByIdAndDelete(articleId)
			.then(function (result) {
				res.json(result)
			})
			.catch(next)
  }

  static updateArticle(req, res, next) {
		const { articleId } = req.query

    Article.findByIdAndUpdate(
      articleId,
      req.body,
			{
				runValidators: true,
				new: true,
			}
    )
      .then(function (result) {
        res.json(result)
      })
      .catch(next)
  }
}


module.exports = { ArticleController }
