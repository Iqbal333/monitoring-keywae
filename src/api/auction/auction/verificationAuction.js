import request from '@/utils/auction';

export function verificationAuction(pagination, filter = {}) {
    return request({
      url: 'auction/pending',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }