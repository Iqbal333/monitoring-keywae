import request from '@/utils/auction';

export function updateAuction(data) {
    return request({
      url: 'auction/update',
      method: 'PUT',
      data: JSON.stringify(data),
    });
  } 