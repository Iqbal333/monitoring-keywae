import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/token';

// create example axios
const service = axios.create({
  baseURL: '/shop/v1/', // api dari base_url
  timeout: 5000, // request timeout
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

service.defaults.withCredentials = true;

//request ke RESTAPI
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getState().user.token) {
      // Default request with token
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

export default service;
