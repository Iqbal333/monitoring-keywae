import request from '@/utils/auction';

export function partner(pagination, filter = {}) {
    return request({
      url: 'partners',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }