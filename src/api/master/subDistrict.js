import request from '@/utils/request';

export function getSubDistrict(districtId, pagination, filter = {}) {
  return request({
    url: 'globals/subDistrict',
    method: 'GET',
    params: { districtId, ...pagination, ...filter },
  });
}
