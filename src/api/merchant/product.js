import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'products',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: 'products',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/products',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/products',
    method: 'DELETE',
    data: JSON.stringify({
      orderStatusId: id,
    }),
  });
}
