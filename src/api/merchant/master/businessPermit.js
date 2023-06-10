import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'master/businessPermitType',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/master/addBusinessPermitType',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/master/updateBusinessPermitType',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/master/deleteBusinessPermitType',
    method: 'DELETE',
    data: JSON.stringify({
      businessPermitTypeId: id,
    }),
  });
}
