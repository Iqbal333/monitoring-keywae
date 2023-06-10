import request from '@/utils/auction';

export function deleteCategoryType(data) {
  return request({
    url: 'category/types',
    method: 'DELETE',
    data: data,
  });
}
