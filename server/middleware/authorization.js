const Article = require('../model/Article')

module.exports = {
    authorization: (req,res,next)=>{
        console.log('AUTHORIZATION RUNNING')
        const { articleId } = req.body

        Article.findOne({
            _id:articleId
        })
        .then(result=>{
            console.log('result nih', result)
            if(result && String(result.authorId) == String(req.decodedUser._id))
              {
                next()
              }
            else
              {
                next({ status:403, message:'unauthorized user'})
              }


        })
        .catch(err=>{
            next()
        })




    }


}


