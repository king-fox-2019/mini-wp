const jwt = require('jsonwebtoken')
const { User, Article } = require('../models')


module.exports = {
	authenticate: function (req, res, next) {
		if (!req.headers.access_token) {
			return next({ name: 'JWTNotFound', message: 'Token is required' })
		}

		try {
			const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)

			User.findById(decoded.id)
				.then(function (user) {
					if (!user) throw { name: 'BadRequest', message: 'Unknown token user' }
					else {
						req.user = user
						next()
					}
				})
				.catch(next)
		} catch (err) {
			next(err)
		}
	},

	authorize: function (req, res, next) {
		const { articleId } = req.query

		if (!articleId) next({ name: 'BadRequest', message: 'Article id is required' })

		Article.findById(req.query.articleId)
			.then(function (article) {
				if (!article) throw { name: 'BadRequest', message: 'Article not found' }
				else {
					if (article.author != req.user.id) throw { name: 'Unauthorized', message: 'You are not authorized' }
					else next()
				}
			})
			.catch(next)
	}
}
