import request from '@/utils/request';

export function getRegion(pagination, filter = {}) {
  return request({
    url: 'globals/region',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
