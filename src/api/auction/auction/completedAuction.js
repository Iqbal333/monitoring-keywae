import request from '@/utils/auction';

export function completedAuction(pagination, filter = {}) {
    return request({
      url: 'auction/finished',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
}