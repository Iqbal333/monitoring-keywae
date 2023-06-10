import request from '@/utils/auction';

export function verificationAuctionDetail(pagination, filter = {}) {
    return request({
      url: 'auction/edit',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }