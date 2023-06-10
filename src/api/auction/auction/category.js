import request from '@/utils/auction';

export function category(pagination, filter = {}) {
    return request({
      url: 'category',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
}