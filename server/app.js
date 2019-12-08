if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

const cors = require("cors")
const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/mini-wp"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(_ => console.log('connected to database.'))
    .catch(_ => console.log('database connection failed.'));


app.use('/', routes)

app.use((req, res, next) => {
    const err = {
        msg: 'Not Found.',
        status: 404
    }
    next(err);
})

app.use(errorHandler);

app.listen(port, () => console.log(`listening on iloveyou${port}`))