import request from '@/utils/merchant';

export function getAllData(pagination, filter = {}) {
  return request({
    url: 'restaurant',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getDetailResto(restaurantId) {
  return request({
    url: '/restaurant/detail',
    method: 'GET',
    params: { restaurantId },
  });
}

export function verificationResto(foodPartnerId) {
  return request({
    url: '/partner/verify',
    method: 'PUT',
    params: { foodPartnerId }
  })
}

export function approvalResto(foodPartnerId) {
  return request({
    url: '/partner/approve',
    method: 'PUT',
    params: { foodPartnerId }
  })
}