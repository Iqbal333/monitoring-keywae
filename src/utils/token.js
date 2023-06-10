import Cookies from 'js-cookie'

const TokenKey = 'Token'
const RegisterTokenKey = 'driver-reg-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTokenRegister() {
  return Cookies.get(RegisterTokenKey)
}

export function setTokenRegister(token) {
  return Cookies.set(RegisterTokenKey, token)
}

export function removeTokenRegister() {
  return Cookies.remove(RegisterTokenKey)
}
