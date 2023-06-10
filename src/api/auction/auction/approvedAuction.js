import request from '@/utils/auction';

export function approvedAuction(pagination, filter = {}) {
    return request({
      url: 'auction/approved',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }