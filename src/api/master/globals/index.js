import request from '@/utils/request';

export function getServiceType() {
  return request({
    url: 'globals/serviceType',
    method: 'GET',
  });
}
