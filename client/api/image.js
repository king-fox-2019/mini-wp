const axios = require('axios')

const image = axios.create({
    baseURL: 'http://localhost:3000/image'
})

module.exports = image