import axios from "axios"
// create example axios
const service = axios.create({
    baseURL: '/shop/v1', // api dari base_url
    timeout: 5000, // request timeout
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
});

export default service;