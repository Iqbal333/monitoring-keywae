import request from '@/utils/auction';

export function publishAuction(data) {
    return request({
      url: 'auction/publish',
      method: 'PUT',
      data: JSON.stringify(data),
    });
  } 