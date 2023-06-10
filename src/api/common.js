import request from '@/utils/common'

export function accessRoles(token) {
    return request({
        url: '/user/profile',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}