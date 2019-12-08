if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const Article = require('./router/article')
const User = require('./router/user')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wowordpress', {useNewUrlParser: true});
const errorHandler = require('./middlewares/errorHandler')
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(cors())

app.use('/user', User)
app.use('/article', Article)
app.use(errorHandler)

app.listen(port)