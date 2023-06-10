import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'master/picRoles',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function addData(data) {
  return request({
    url: '/master/addPicRoles',
    method: 'POST',
    data: JSON.stringify(data),
  });
}

export function editData(data) {
  return request({
    url: '/master/updatePicRoles',
    method: 'PUT',
    data: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return request({
    url: '/master/deletePicRoles',
    method: 'DELETE',
    data: JSON.stringify({
      picRoleId: id,
    }),
  });
}
