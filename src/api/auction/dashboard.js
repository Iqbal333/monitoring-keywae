import request from '@/utils/auction'

export function getDashboard() {
    return request({
        url: 'dashboard',
        method: 'GET'
    })
}

export function getDashboardLastBid() {
    return request({
        url: 'dashboard/lastBid',
        method: 'GET'
    })
}