'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT
const MONGOURI = process.env.MONGO_URI || 'mongodb://localhost:27017/miniWP'
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
    .connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(_ => console.log(`Connected to mongoDB ${MONGOURI}`))
    .catch(err=> console.log(`Unable to connect to ${MONGOURI}, error=> ${err}`))

app.get('/', (req, res) => res.send('Hello word'));

const { article, user } = require('./routes')
app.use('/article', article);
app.use('/user', user);

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))