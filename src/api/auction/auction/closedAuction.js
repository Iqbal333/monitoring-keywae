import request from '@/utils/auction';

export function closedAuction(data) {
    return request({
      url: 'auction/closed',
      method: 'PUT',
      data: JSON.stringify(data),
    });
  } 