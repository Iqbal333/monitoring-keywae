import request from '@/utils/request';

export function getAllData(pagination, filter = {}) {
  return request({
    url: '/pricing',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/pricing',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/pricing',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/pricing',
    method: 'DELETE',
    data: JSON.stringify({
      additionalPriceId: id,
    }),
  });
}
