'use strict'

if (process.env.NODE_ENV == 'development') require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const router = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect('mongodb://localhost/miniwp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
  if (err) console.log('database is an error')
  else console.log('data base in an active')
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => { console.log(`listening on por ${PORT}`) })
