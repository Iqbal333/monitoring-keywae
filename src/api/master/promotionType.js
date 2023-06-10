import request from '@/utils/request';

export const getPromotionType = () => {
    return request({
        url: '/globals/promotionType',
        method: 'GET'
    })
}