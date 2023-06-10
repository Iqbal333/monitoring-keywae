import request from '@/utils/auction';

export function liveEvent(pagination, filter = {}) {
    return request({
      url: 'events/opened',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }