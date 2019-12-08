'use strict';


//require packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

//declare const for express app
const app = express();
const port = 3000;

//setup express & another package
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'RESTFUL API MINI-WP'
    })
})

app.use('/user', userRouter)
app.use('/article', articleRouter)

app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/MiniWP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        // console.clear()
        console.log('Connecting to database server....');
        console.log('batabase connected');
        app.listen(port, () => {
            console.log(`Mini-WP RESTFULL API server ready listening on port ${port}`);
        })
    }
})

