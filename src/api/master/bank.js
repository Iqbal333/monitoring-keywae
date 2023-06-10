import request from '@/utils/request';

export function getBanks(pagination, filter = {}) {
  return request({
    url: 'globals/bank',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
