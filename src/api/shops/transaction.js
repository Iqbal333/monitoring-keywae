import request from '@/utils/shop';

export function transactionDashboard() {
    return request({
        url: 'transaction/dashboard',
        method: 'GET'
    })
}

export function getTransaction(pagination = {}, filters = {}) {
    return request({
        url: 'transaction',
        method: 'GET',
        params: {
            ...pagination,
            ...filters
        }
    })
}

export function getDetailTransaction(paymentId) {
    return request({
        url: 'transaction/detail',
        method: 'GET',
        params: {
            payment_id: paymentId
        }
    })
}