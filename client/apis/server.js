import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'http://minipc-miniwpking.anggabanny.online'
});

export default instance