import request from '@/utils/auction';

export function editCategory(data) {
  return request({
    url: 'category',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
}
