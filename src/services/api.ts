import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1/'
    // process.env.NODE_ENV === 'production'
    //   ? process.env.REACT_APP_PROD_API_URL
    //   : process.env.REACT_APP_DEV_API_URL,
});

export default api;
