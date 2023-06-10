import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'master/businessType',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/master/addBusinessType',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/master/updateBusinessType',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/master/deleteBusinessType',
    method: 'DELETE',
    data: JSON.stringify({
      businessTypeId: id,
    }),
  });
}
