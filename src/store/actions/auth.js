import { setUserToken, resetUser } from "./user";
import { adminAccessPermission, reqLogin, reqLogout } from "@/api/auth";
import { accessRoles } from "@/api/common";
import { setToken, removeToken } from "@/utils/token";

export const login = (account, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ account: account.trim(), password: password })
      .then((response) => {
        const { data } = response;
        if (data.success === true) {
          const token = data.token;
          accessRoles(token)
            .then((results) => {
              if (results.data.success === true) {
                if (results.data.roles?.length > 0 && (results.data?.roles[0]?.name === 'superuser' || results.data?.roles[0]?.name === 'adminkeytor' || results.data?.roles[0]?.name === 'adminkeyfood')) {
                  dispatch(setUserToken(token));
                  setToken(token);
                  resolve(data);
                } else {
                  reject('Akun tidak memiliki akses');
                }
              } else {
                reject('Akun tidak memiliki akses');
              }
            })
            .catch((error) => {
              reject(error);
            })
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const { data } = response;
        if (data.success === true) {
          dispatch(resetUser());
          removeToken();
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
