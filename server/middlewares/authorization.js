'use strict'

const { Article } = require('../models')

module.exports = (req, res, next) => {
  Article
    .findById({ _id: req.params.id })
    .then(article => {
      if (String(article.userId) == String(req.decoded._id)) {
        next()
      } else {
        next({ status: 403, message: `You dont have authorize to do that` })
      }
    })
    .catch(err => { next(err) })
}




