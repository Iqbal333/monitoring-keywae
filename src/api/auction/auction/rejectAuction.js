import request from '@/utils/auction';

export function rejectAuction(data) {
    return request({
      url: 'auction/reject',
      method: 'PUT',
      data: JSON.stringify(data),
    });
  } 