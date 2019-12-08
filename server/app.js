'use strict';


//require packages
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routes/user');

//declare const for express app
const app = express();
const port = 3000;
const jsonResponse = {}

//setup express & another package
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', function (req, res) {
    jsonResponse.status = 'success'
    jsonResponse.code = 200
    jsonResponse.message = 'RESTFUL API FOR MINI-WP'
    res.status(jsonResponse.code).json(jsonResponse)
})

app.use('/user',userRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`CORS-enabled web server listening on port ${port}`);
})