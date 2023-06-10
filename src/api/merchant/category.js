import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'category',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDetail(categoryId, pagination, filter = {}) {
  return request({
    url: 'productsByCategory',
    method: 'GET',
    params: { categoryId, ...pagination, ...filter },
  });
}
