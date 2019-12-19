const Article = require('../models/Article')

class ArticleController {

   static create(req, res, next) {

      const inputs = {
         title: req.body.title,
         content: req.body.content,
         image: (req.body.image) ? req.body.image : '',
         slug: req.body.title.split(' ').join('-'),
         user: req.decoded.userId
      }

      Article
      .create(inputs)
      .then(article => {
         console.log('article created', article)
         res.status(201).json({message: 'Article creation success'})
      })
      .catch(next)
   }

   static readAll(req, res, next) {
      Article
      .find({user: req.decoded.userId})
      .then(articles => {
         res.status(200).json({articles})
      })
      .catch(next)
   }

   static readOne(req, res, next) {
      Article
      .findOne({_id: req.params.id})
      .then(article => {
         res.status(200).json({article})
      })
      .catch(next)
   }


   static update(req, res, next) {
      
      let inputs = {}

      if(req.body.image != '') inputs = req.body
      else {
         inputs.title = req.body.title,
         inputs.content = req.body.content
      }

      console.log(inputs, 'at article controller update')

      Article
      .updateOne({_id: req.params.id}, {$set: inputs})
      .then(() => {
         res.status(200).json({message: 'Article update success'})
      })
      .catch(next)
   }

   static delete(req, res, next) {

      Article
      .deleteOne({_id: req.params.id})
      .then(results => {
         console.log(results)
         res.status(200).json({message: 'Article deletion successful'})
      })
      .catch(next)
   }


   static uploadImage(req, res, next) {}
}


module.exports = ArticleController