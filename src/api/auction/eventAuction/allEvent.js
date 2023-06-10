import request from '@/utils/auction';

export function allEvent(pagination, filter = {}) {
    return request({
      url: 'events',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }