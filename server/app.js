if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')
const { errorHandler } = require('./middlewares')
const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/miniwp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('db connected'))
  .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => console.log('listening on port', port))
