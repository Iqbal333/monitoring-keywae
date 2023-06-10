import request from '@/utils/auction';

export function participant(data, pagination, filter = {}) {
    return request({
      url: 'participant',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
        "auctionId": data
      }
    });
  }