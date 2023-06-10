import request from '@/utils/auction'

export function getAuction(pagination = {}, filter = {}) {
    return request({
        url: 'auction',
        method: 'GET',
        params: {
            ...pagination,
            ...filter
        }
    })
}

export function getAuctionById(auctionId) {
    return request({
        url: 'auction/edit',
        method: 'GET',
        params: {
            auctionId
        }
    })
}

export function approveAuction(auctionId) {
    return request({
        url: 'auction/approve',
        method: 'PUT',
        data: JSON.stringify({auctionId})
    })
}

export function rejectAuction(auctionId) {
    return request({
        url: 'auction/reject',
        method: 'PUT',
        data: JSON.stringify({auctionId})
    })
}