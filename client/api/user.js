const axios = require('axios')

const user = axios.create({
    baseURL: 'http://localhost:3000/user'
})

module.exports = user