import request from '@/utils/auction';

export function winnerLogs(pagination, filter = {}) {
    return request({
      url: 'bidding/payment',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }