import request from '@/utils/shop';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'settings/page',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
