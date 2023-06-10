import request from '@/utils/auction';

export function participantApprove(data) {
    return request({
      url: 'participant/approve',
      method: 'PUT',
      data: JSON.stringify(data),
    });
  }