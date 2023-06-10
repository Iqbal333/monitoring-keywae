import request from '@/utils/auction';

export function participantBid(data, pagination, filter = {}) {
    return request({
      url: 'participant/bidding',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
        "auctionId": data
      },
    });
}