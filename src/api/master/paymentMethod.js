import request from '@/utils/request';

export function getPaymentMethod(pagination, filter = {}) {
  return request({
    url: 'globals/paymentMethod',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
