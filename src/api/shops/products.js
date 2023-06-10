import request from '@/utils/shop';

export function getAllProduct(pagination, filter = {}) {
  return request({
    url: 'products/all',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getProductDetail(product_id) {
  return request({
    url: 'products/detail',
    method: 'GET',
    params: {
      product_id,
    },
  });
}

export function getReviews(pagination, filter = {}) {
  return request({
    url: 'products/review',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getAttributes(pagination, filter = {}) {
  return request({
    url: 'products/variant',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getCategory(pagination, filter = {}) {
  return request({
    url: 'products/category',
    method: 'GET',
    params: {
      ...pagination,
      ...filter,
    },
  });
}

export function getCategoryGroup(categoryId, pagination, filter = {}) {
  return request({
    url: 'products/group',
    method: 'GET',
    params: {
      category_id: categoryId,
      ...pagination,
      ...filter,
    },
  });
}

export function getCategoryType(categoryGroupId, pagination, filter = {}) {
  return request({
    url: 'products/type',
    method: 'GET',
    params: {
      group_id: categoryGroupId,
      ...pagination,
      ...filter,
    },
  });
}

export function deleteReviews(productreview_id) {
  return request({
    url: 'products/review',
    method: 'DELETE',
    params: {
      productreview_id,
    },
  });
}
