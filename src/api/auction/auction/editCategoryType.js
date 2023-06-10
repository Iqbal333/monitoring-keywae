import request from '@/utils/auction';

export function editCategoryType(data) {
  return request({
    url: 'category/types',
    method: 'PUT',
    data: data,
  });
}
