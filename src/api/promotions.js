import request from "@/utils/request";

export const getAllPromotions = (query, filter) => {
    return request({
        url: '/promotions',
        method: 'GET',
        params: {
            ...query,
            ...filter
        }
    })
}

export const getPromotion = (promotionId) => {
    return request({
        url: '/promotions/edit',
        method: 'GET',
        params: {
            promotionId
        }
    })
}

export const addPromotion = (data) => {
    return request({
        url: '/promotions',
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data
    })
}

export const updatePromotion = (data) => {
    return request({
        url: '/promotions/update',
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data
    })
}

export const deletePromotion = (promotionId) => {
    return request({
        url: '/promotions',
        method: 'DELETE',
        data: {
            promotionId
        }
    })
}

export const publishPromotion = (data) => {
    return request({
        url: '/promotions/publish',
        method: 'PUT',
        data
    })
}