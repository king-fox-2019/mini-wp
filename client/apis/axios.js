import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://weewpserver.hoandreasm.xyz/'
})

export default instance