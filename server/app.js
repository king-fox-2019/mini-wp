if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const mongoose = require('mongoose')
// const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`)
  }, (err) => {
    console.log(`Cannot connect to MongoDB`)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(morgan())
app.use(routes)

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})