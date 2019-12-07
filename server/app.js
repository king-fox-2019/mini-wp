if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const {errorHandler} = require('./middlewares/errorHandler')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


mongoose.connect('mongodb://localhost:27017/new-mini-wp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},function(err){
    if(err) console.log(err)
    else console.log('successfully connected to database')
})

.then(_=> {
    console.log("mongoodb successfully connected");
})
.catch(console.log)

app.use('/',routes)
app.use(errorHandler)

app.listen(PORT,_=>{
    console.log(`listening on port ` + PORT)
})