if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()

const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 3003



// mongoose.connect(process.env.MONGO_ATLAS, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false })
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false })

.then(() => {
  console.log(`Server connected`);  
})
.catch(err => {
  console.log(`Failed to connect to server`);
  
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on PORT`, PORT))