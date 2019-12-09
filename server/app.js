if(process.env.NODE_ENV == 'development') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 55555
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routers')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(`mongodb+srv://aws-miniwp-zoe:Ravepro203@hikari0-rmg8u.mongodb.net/test?retryWrites=true&w=majority`, {
   useNewUrlParser: false
})

app.listen(port, () => console.log(`listening on port ${port}`))

app.get('/hellow', (req, res) => {
	res.json({message:'hello'})
})

app.use(router)
