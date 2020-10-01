import axios from 'axios';
import * as env from '../../dotEnv';

const api = axios.create({
    baseURL: env.API_URL
})

export default api;
///