import request from '@/utils/auth'

export function reqUserInfo(data) {
  return request({
    url: '/accounts',
    method: 'GET',
    data
  })
}