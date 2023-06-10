import request from '@/utils/shop';

export function getSellers(pagination = {}, filters = {}) {
    return request({
        url: 'sellers/store',
        method: 'GET',
        params: {
            ...pagination,
            ...filters
        }
    })
}

export function getSellerById(store_id) {
    return request({
        url: 'sellers/store/detail',
        method: 'GET',
        params: {
            store_id
        }
    })
}