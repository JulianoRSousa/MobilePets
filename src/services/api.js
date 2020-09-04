import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-apipets.herokuapp.com'
})

export default api;
//