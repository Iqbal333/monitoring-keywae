import request from '@/utils/auction';

export function deleteCategory(data) {
  return request({
    url: 'category',
    method: 'DELETE',
    data: data,
  });
}
