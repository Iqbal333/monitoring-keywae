import request from '@/utils/request'

export function getInterviews(query, filter) {
    return request({
        url: '/interviews',
        method: 'get',
        params: {
            ...query,
            ...filter
        }
    })
}

export function getInterviewEdit(interviewsId) {
    return request({
        url: '/interviews/edit',
        method: 'get',
        params: {
            interviewsId
        }
    })
}

export function getInterviewDriver(query, filter) {
    return request({
        url: '/interviews/drivers',
        method: 'get',
        params: {
            ...query,
            ...filter
        }
    })
}

export function getInterviewSchedule(interviewsId, query, filter) {
    return request({
        url: '/interviews/schedules',
        method: 'get',
        params: {
            interviewsId,
            ...query,
            ...filter
        }
    })
}

export function checkSendEmail(interviewsId) {
    return request({
        url: '/interviews/checkSendEmail',
        method: 'get',
        params: {
            interviewsId
        }
    })
}

export function sendEmail(interviewsId) {
    return request({
        url: '/interviews/sendEmail',
        method: 'get',
        params: {
            interviewsId
        }
    })
}

export function addInterview(body) {
    return request({
        url: '/interviews',
        method: 'post',
        data: body
    })
}

export function updateInterview(body) {
    return request({
        url: '/interviews',
        method: 'put',
        data: body
    })
}

export function deleteInterview(interviewsId) {
    return request({
        url: '/interviews',
        method: 'delete',
        data: {
            interviewsId
        }
    })
}