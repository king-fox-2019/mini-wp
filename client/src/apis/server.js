import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://34.87.73.163/',
  Headers : {
    token : localStorage.getItem('token')
  }
})


export default instance