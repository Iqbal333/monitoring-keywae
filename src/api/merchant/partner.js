import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'partners',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
