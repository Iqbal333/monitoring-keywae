import request from '@/utils/request';

export function getSubBrand(brandId, pagination, filter = {}) {
  return request({
    url: 'master/brand/subBrand',
    method: 'GET',
    params: { brandId, ...pagination, ...filter },
  });
}

export function addSubBrand(data) {
  return request({
    url: 'master/brand/subBrand',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editSubBrand(data) {
  return request({
    url: 'master/brand/subBrand',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteSubBrand(data) {
  return request({
    url: 'master/brand/subBrand',
    method: 'DELETE',
    data: JSON.stringify(data),
  });
}
