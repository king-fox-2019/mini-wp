const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes')

const cors = require("cors")
const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/kingevent"

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


app.listen(port, ()=> console.log(`listening on iloveyou${port}`))