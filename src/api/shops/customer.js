import request from '@/utils/shop';

export function getAllCustomer(pagination, filter = {}) {
  return request({
    url: 'customer',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDetail(customer_id, pagination, filter = {}) {
  return request({
    url: 'customer/detail',
    method: 'GET',
    params: {
      customer_id,
      ...pagination,
      ...filter,
    },
  });
}
