import request from '@/utils/request';

export function getVillage(subDistrictId, pagination, filter = {}) {
  return request({
    url: 'globals/village',
    method: 'GET',
    params: { subDistrictId, ...pagination, ...filter },
  });
}
