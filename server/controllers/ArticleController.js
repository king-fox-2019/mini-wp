const { Article } = require('../model')

class ArticleController
{

    static test(req,res)
      {
        res.send('hello article connected')
      }



    static createArticle(req,res,next)
      {
          const { title, content } = req.body
          Article.create({
              title,
              content,
              createdAt: new Date()
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(next)
        //   .catch(err=>{
        //       res.status(500).json(err)
        //   })
      }


    static getOneArticle(req,res,next)
      {
          const { title } = req.body
          Article.findOne({
              title
          })
          .then(result=>{
              if(result)
                res.status(200).json(result)
              else
                throw ({
                  name: 'custom error',
                  message: "Article not Found"
                })
          })
          .catch(next)
      }


    static getAllArticle(req,res,next)
      {
          Article.find()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(next)
      }


    static putArticle(req,res,next)
      {
          const { title, content } = req.body
          Article.update(
            { _id: req.headers._id },
            { title, content }
          )
          .then( result =>{
            res.status(200).json(result)
          })
          .catch(next)
      }


    static patchArticle(req,res,next)
      {
          const values = Object.values(req.body)
          const keys = Object.keys(req.body)
          
          let query ={}
          for (let x = 0 ; x < keys.length; x++)
            {
                query[keys[x]] = values[x]
            }
          console.log(req.headers._id)
          Article.update(
              { _id : req.headers._id},
              { $set : query }
            )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(next)

      }


    static deleteArticle(req,res,next)
      {
        Article.remove({
          _id: req.headers._id
        })
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(next)
      }




}


module.exports = ArticleController