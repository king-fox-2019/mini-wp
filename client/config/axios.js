import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://miniwpserver.angelavanessa.com'
    baseURL: 'http://localhost:3000'
});

export default instance