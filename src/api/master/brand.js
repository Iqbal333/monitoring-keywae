import request from '@/utils/request';

export function getBrand(pagination, filter = {}) {
  return request({
    url: 'master/brand',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addBrand(data) {
  return request({
    url: 'master/brand',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
}

export function editBrand(data) {
  return request({
    url: 'master/brand/update',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: JSON.stringify(data),
  });
}

export function deleteBrand(id) {
  return request({
    url: 'master/brand',
    method: 'DELETE',
    data: JSON.stringify({
      brandId: id,
    }),
  });
}
