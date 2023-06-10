import request from '@/utils/request';

export function getAllData(pagination, filter = {}) {
  return request({
    url: '/pricing/profit',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/pricing/profit',
    method: 'POST',
    data: JSON.stringify(data)
  });
}

export function editData(data) {
  return request({
    url: '/pricing/profit',
    method: 'PUT',
    data: JSON.stringify(data)
  });
}

export function deleteData(id) {
  return request({
    url: '/pricing/profit',
    method: 'DELETE',
    data: JSON.stringify({
      profitSharingId: id
    })
  });
}