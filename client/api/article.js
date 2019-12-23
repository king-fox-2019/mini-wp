const axios = require('axios')

const article = axios.create({
    baseURL: 'http://localhost:3000/article'
})

module.exports = article
