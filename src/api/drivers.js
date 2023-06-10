import request from '@/utils/request';

export function getAllDriver(pagination, filter = {}) {
  return request({
    url: 'drivers',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDetailDriver(driverId) {
  return request({
    url: 'drivers/details',
    method: 'GET',
    params: { driverId },
  });
}

export function approveDriver(driverId) {
  return request({
    url: 'drivers/approve',
    method: 'PUT',
    data: JSON.stringify({ driverId: driverId })
  });
}


export function verifyDriver(driverId) {
  return request({
    url: 'drivers/verify',
    method: 'PUT',
    data: JSON.stringify({ driverId: driverId })
  });
}

export function rejectDriver(driverId) {
  return request({
    url: 'drivers/reject',
    method: 'PUT',
    data: JSON.stringify({ driverId: driverId })
  });
}

export function getDashboardMaps(serviceTypeId) {
  return request({
    url: 'dashboard/maps',
    method: 'GET',
    params: {
      serviceTypeId
    }
  })
}

export function updatedBiodata(data) {
  return request({
    url: 'updatedBiodata',
    method: 'PUT',
    data
  })
}

export function updatedVehicles(data) {
  return request({
    url: 'updatedVehicle',
    method: 'PUT',
    data
  })
}

export function updatedBank(data) {
  return request({
    url: 'updatedBank',
    method: 'PUT',
    data
  })
}

export function updatedAddress(data) {
  return request({
    url: 'updatedAddress',
    method: 'PUT',
    data
  })
}

export function updatedIdNumber(data) {
  return request({
    url: 'updatedIdNumber',
    method: 'PUT',
    data
  })
}

export function updatedDriverNumber(data) {
  return request({
    url: 'updatedDriverNumber',
    method: 'PUT',
    data
  })
}