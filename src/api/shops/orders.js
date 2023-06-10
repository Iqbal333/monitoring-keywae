import request from '@/utils/shop';

export function getAllOrders(pagination, filter = {}) {
  return request({
    url: 'orders',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getOrderById(orderId) {
  return request({
    url: 'orders/details',
    method: 'GET',
    params: {
      orderId
    },
  });
}

export function getPending(pagination, filter = {}) {
  return request({
    url: 'orders/pending',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getConfirmed(pagination, filter = {}) {
  return request({
    url: 'orders/confirm',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getPackaging(pagination, filter = {}) {
  return request({
    url: 'orders/packaging',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDelivered(pagination, filter = {}) {
  return request({
    url: 'orders/delivered',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getCanceled(pagination, filter = {}) {
  return request({
    url: 'orders/canceled',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}
