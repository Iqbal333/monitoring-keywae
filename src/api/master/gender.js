import request from '@/utils/request';

export function getGender(pagination, filter = {}) {
  return request({
    url: 'globals/gender',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
