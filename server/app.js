if (process.env.NODE_ENV === 'development') require('dotenv').config()

//setup mongoose
const mongoose = require('mongoose')
const uris = 'mongodb://localhost:27017/medium'
mongoose.connect(process.env.ATLAS_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_=> {
        console.log('db connected')
    })
    .catch(_=> {
        console.log('db disconnected')
    })

//setup express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)
app.use(errorHandler)

app.listen(port, _=>{
    console.log('listening port', port)
})