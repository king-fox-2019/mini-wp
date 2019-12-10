const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://35.185.181.180'
})

module.exports = instance