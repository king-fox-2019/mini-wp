const routes = require('express').Router()
const user = require('./user')
const article = require('./article')

routes.get('/',(req,res,next)=>{
    res.status(200).json('Connect to server ok!')
})

routes.use('/user',user)
routes.use('/article',article)

module.exports = routes