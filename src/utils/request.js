import axios from "axios"
import store from '@/store'
import { Modal } from "antd";
import { getToken } from "@/utils/token";
import { logout } from "@/store/actions";

// create example axios
const service = axios.create({
    baseURL: '/api/v1/', // api dari base_url
    timeout: 5000, // request timeout
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
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

//RESPONSE
service.interceptors.response.use(
    (response) => response,
    
    (error) => {
      console.log("err" + error); // for debug
      const { status } = error.response;
      if (status === 403) {
        Modal.confirm({
          title: "Logout?",
          content:
            "You have been logged out due to inactivity for a long time, you can cancel to stay on this page, or log in again",
          okText: "Ok",
          cancelText: "Cancel",
          onOk() {
            let token = store.getState().user.token;
            store.dispatch(logout(token));
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      }
      return Promise.reject(error);
    }
  );

  export default service;