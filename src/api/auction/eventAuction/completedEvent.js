import request from '@/utils/auction';

export function completedEvent(pagination, filter = {}) {
    return request({
      url: 'events/finished',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }