if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const urlMongoose = process.env.URLMONGOOSE
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(urlMongoose, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, function(err) {
  if(err) console.log(`Failed to connect to db ಠ_ಠ`)
  else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ connected to db `);
})

app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, ()=> console.log('╚(ಠ_ಠ)=┐ Running on port: ', PORT))