if (process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const PORT = process.env.PORT || 3000
require('./config/mongoose')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, (_=>{ console.log(`listen to port`, PORT)}))