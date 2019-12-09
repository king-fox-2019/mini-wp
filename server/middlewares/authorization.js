const Article = require('../models/Articles')

module.exports = (req,res,next)=>{
    Article.findOne({_id:req.params.id})
    .then(article => {
        if(article.userId == req.loggedUser.id){
            next()
        }else{
            next({
                status : 401,
                message : 'unauthorized user'
            })
        }
    }) 
    .catch(err => {
        next(err)
    })
}