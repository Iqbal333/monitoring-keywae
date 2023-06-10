import request from '@/utils/auction';

export function eventDashboard(pagination, filter = {}) {
    return request({
      url: 'events/dashboard',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }