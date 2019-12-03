if(process.env.NODE_ENV==='development')
{
    require('dotenv').config()
}
require('./config/mongoose')



const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 7000
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors())

app.use( require('./router') )
app.use( require('./middleware/errorHandler'))



app.listen(port, ()=>{
    console.log('listening on port', port)
} )