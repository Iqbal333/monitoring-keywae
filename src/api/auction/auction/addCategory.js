import request from '@/utils/auction';

export function addCategory(data) {
  return request({
    url: 'category',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
}
