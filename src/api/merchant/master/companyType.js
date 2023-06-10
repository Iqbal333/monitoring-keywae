import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'master/companyType',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/master/addCompanyType',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/master/updateCompanyType',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/master/deleteCompanyType',
    method: 'DELETE',
    data: JSON.stringify({
      companyTypeId: id,
    }),
  });
}
