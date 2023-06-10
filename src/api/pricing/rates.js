import request from '@/utils/request';

export function getAllData(pagination, filter = {}) {
  return request({
    url: '/pricing/rates',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/pricing/rates',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/pricing/rates',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/pricing/rates',
    method: 'DELETE',
    data: JSON.stringify({
      priceId: id,
    }),
  });
}
