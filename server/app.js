if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();

}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const MONGOURI = process.env.MONGO_URI;
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

const article = require('./routes/article')
app.use('/article', article)

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))