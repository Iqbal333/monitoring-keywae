import request from '@/utils/request';

export function getAllTransaction(pagination, filter = {}) {
  return request({
    url: '/orders',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDetailTransaction(orderId) {
  return request({
    url: 'orders/details',
    method: 'GET',
    params: { orderId },
  });
}

export function transactionList() {
  return request({
    url: '/orders',
    method: 'GET',
  });
}

export function incomes(query, filter) {
  return request({
    url: '/incomes',
    method: 'GET',
    params: {
      ...query,
      ...filter
    }
  })
}

export function listIncomes(query, filter) {
  return request({
    url: '/incomes/list',
    method: 'GET',
    params: {
      ...query,
      ...filter
    }
  })
}

export function detailIncome(orderId) {
  return request({
    url: '/incomes/details',
    method: 'GET',
    params: {
      orderId
    }
  })
}