const Article = require('../models/Article');

function authorization(req, res, next){
    console.log('authorization invoked');
    console.log('req.params.id => ',req.params.id);
    console.log('req.decode.id => ',req.decode.id);

    Article.findById(req.params.id)
        .then(( article ) => {
            if(!article){
                next({ status:404, message : "Article not found" })
            } else {
                if ( article.UserId == req.decode.id ) {
                    next()
                } else {
                    next({ status:401, message : "Not authorized user" })
                }
            }
        })
        .catch(next)
}

module.exports = authorization