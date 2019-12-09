if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
  require('dotenv').config()
}

const express = require("express"),
  app = express(),
  router = require('./routes'),
  mongoose = require('mongoose'),
  cors = require('cors')
  errorHandler = require('./middlewares/errorHandler'),
  port = process.env.PORT || 3000

mongoose.connect(process.env.ATLAS, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, function(err) {
  if(err) {
    console.log('connection to db failed')
  } else {
    console.log('bd connected')
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => console.log("listening on: ", port))