import request from '@/utils/auction';

export function categoryType(pagination, filter = {}) {
    return request({
      url: 'category/types',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
}