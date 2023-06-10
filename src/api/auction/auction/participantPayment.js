import request from '@/utils/auction';

export function participantPayment(pagination, filter = {}) {
    return request({
      url: 'participant/payment',
      method: 'GET',
      params: {
        ...pagination,
        ...filter,
      },
    });
  }