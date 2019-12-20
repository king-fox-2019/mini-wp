if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

mongoose
  .connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
  })
  .then(() => console.log('connected to mongodb server'))
  .catch(err => console.log('error when connecting to mongodb server', err))

app.get('/', (req, res) => {
  console.log('connected to home')
  res.send('ok')
})

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('listening to port', PORT)
})