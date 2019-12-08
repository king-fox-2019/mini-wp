const Article = require('../model/Article')

class ArticleController
{
    static test(req,res)
      {
        res.send('hello article connected')
      }


    static create(req,res,next)
      {
        console.log('req body neh', req.body)
        const { title, content } = req.body
        const authorId = req.decodedUser._id
        const featured_image = req.body.file
        const createdAt = new Date()

        Article.create({
            title,
            content,
            authorId,
            createdAt,
            featured_image
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
          next()
        })

        
      }


    static findAll(req,res,next)
      {
        Article.find({
          authorId : req.decodedUser._id
        })
        .populate('authorId', ' -password -_id -__v')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
          next()
        })

      }


    static filter(req,res,next)
      {
        const keys = Object.keys(req.body)
        const value = Object.values(req.body)

        let query = {}
        for(let x = 0; x < keys.length; x++)
          {
              query[keys[x]] = value[x]
          }

        console.log('query', query)
        Article.find( query )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
          next()
        })
      }


    static putUpdate(req,res,next)
      {
        const { articleId, title, content } = req.body
        // const featured_image
        Article.updateOne(
          { _id:articleId },
          { title, content }
          )
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next
        })
        

      }

    
    static patchUpdate(req,res,next)
      {
        const { articleId } = req.body
        const keys = Object.keys(req.body)
        const value = Object.values(req.body)

        let query = {}
        for(let x = 0; x < keys.length; x++)
          {
              query[keys[x]] = value[x]
          }
        delete query.articleId


        Article.updateOne( 
          { _id:articleId}, 
          query )
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
          next()
        })
      }

    
    static delete(req,res,next)
      {
        const { articleId } = req.body
        
        Article.remove({
          _id:articleId
        })
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next()
        })

      }



}

module.exports = ArticleController