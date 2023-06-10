import request from '@/utils/auth'

export function reqLogin(data) {
  return request({
    url: '/security/loginByAccount',
    method: 'POST',
    data
  })
}

export function adminAccessPermission(data) {
  return request({
    url: '/adminPass',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`
    },
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'GET',
    data
  })
}

export function reqRegister(data) {
  return request({
    url: '/security/register',
    method: 'POST',
    data
  })
}

export function reqCheckEmail(email) {
  return request({
    url: '/checkEmail',
    method: 'GET',
    params: {
      email
    }
  })
}

export function reqCheckPhone(phoneNumber) {
  return request({
    url: '/checkPhone',
    method: 'GET',
    params: {
      phoneNumber
    }
  })
}