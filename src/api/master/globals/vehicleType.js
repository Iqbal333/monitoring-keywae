import request from '@/utils/request';

export function getVehicleType(pagination, filter = {}) {
  return request({
    url: 'globals/vehicleType',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
