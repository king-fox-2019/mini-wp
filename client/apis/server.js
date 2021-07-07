import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

// const instance = axios.create({
//     baseURL: 'http://minipc-miniwp-king.anggabanny.online'
// });

export default instance