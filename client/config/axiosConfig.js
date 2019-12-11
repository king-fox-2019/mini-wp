import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://35.184.99.60:3000'
});

module.exports = {
    instance
};