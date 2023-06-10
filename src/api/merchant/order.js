import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'order/status',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: 'order/status',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/order/status',
    method: 'PUT',
    params: {
      orderStatusId: data.orderStatusId,
    },
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/order/status',
    method: 'DELETE',
    params: {
      orderStatusId: id,
    },
  });
}
