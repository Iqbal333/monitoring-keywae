import request from '@/utils/request'

export function getReviews(query, filter) {
    return request({
        url: 'reviews',
        method: 'GET',
        params: {
            ...query,
            ...filter
        }
    })
}