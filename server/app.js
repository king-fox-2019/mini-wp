if(process.env.NODE_ENV==='development'){
    require('dotenv').config()
}
let port = process.env.PORT || 3001

const express = require('express')
const app = express()
const index = require('./routes/index')
const cors  = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/miniwp', {useNewUrlParser: true,useUnifiedTopology:true});

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',index)
app.use(errorHandler)

app.listen(port,function(){
    console.log(`listening on ${port}`)
})