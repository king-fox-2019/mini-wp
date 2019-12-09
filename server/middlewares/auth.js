
const {verify} = require('../helpers/token')
const Article = require('../models/Article')
function authenticate(req,res,next){
    let token = req.headers.access_token
    if (token) {
        try {
            let payload = verify(token)
            req.id = payload.id
            next()
        } catch (err) {
            next({ code: 400, msg: 'you are not authenticated user' })
        }
    } else {
        next({ code: 400, msg: 'you are not authenticated user' })
    }
}

function authorize(req, res, next){
    let currentId = req.id
    let id = req.params.id
    Article.findOne({ _id:id })
        .then(article => {
            if(article.author == currentId){
                next()
            }else{
                next ({code:401, message:'you are not authorized user'})
            }
        })
}

module.exports = { authenticate , authorize }