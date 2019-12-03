const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const article = require('./routes/article')
const errorHandler = require('./middleware/error')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/miniWp', {useNewUrlParser: true});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/article', article)
app.use(errorHandler)

app.listen(port)