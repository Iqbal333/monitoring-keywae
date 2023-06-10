import request from '@/utils/auction';

export function addCategoryType(data) {
  return request({
    url: 'category/types',
    method: 'POST',
    data: data,
  });
}
