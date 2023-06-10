import request from '@/utils/auction';

export function rejectedAuction(pagination, filter = {}) {
    return request({
      url: 'auction/rejected',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
}