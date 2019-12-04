if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express'),
    app = express(),
    router = require('./routes'),
    errorHandler = require('./middlewares/errorhandler'),
    cors = require('cors')

require('./config/mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', router)
app.use(errorHandler)

module.exports = app