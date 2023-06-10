import request from '@/utils/request';

export function getServiceType(pagination, filter = {}) {
  return request({
    url: 'globals/serviceType',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
