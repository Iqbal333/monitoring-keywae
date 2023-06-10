import request from '@/utils/request';

export function getDistrict(regionId, pagination, filter = {}) {
  return request({
    url: 'globals/district',
    method: 'GET',
    params: { regionId, ...pagination, ...filter },
  });
}
