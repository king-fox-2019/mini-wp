if(process.env.NODE_ENV=='development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const index = require('./routes/index')
const port = process.env.PORT || 3001
// mongoose.connect('mongodb://localhost:27017/mini_wordpress', {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology:true});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',index)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})