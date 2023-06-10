import request from '@/utils/register'
import reqAuth from '@/utils/auth-register'

export function registerAuth(data) {
    return reqAuth({
        url: '/security/register',
        method: 'POST',
        data
    })
}

export function checkStepping() {
    return request({
        url: '/register/driver/checkStepping',
        method: 'GET'
    })
}

export function getVehicleType() {
    return request({
        url: '/register/driver/getVehicleType',
        method: 'GET'
    })
}

export function addVehicleType(data) {
    return request({
        url: '/register/driver/addVehicleType',
        method: 'POST',
        data
    })
}

export function getBiodata() {
    return request({
        url: '/register/driver/getBiodata',
        method: 'GET'
    })
}

export function addBiodata(data) {
    return request({
        url: '/register/driver/addBiodata',
        method: 'POST',
        data
    })
}

export function getAddress() {
    return request({
        url: '/register/driver/getAddress',
        method: 'GET'
    })
}

export function uploadDriverPhoto(data) {
    return request({
        url: '/register/driver/uploadDriverPhoto',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function uploadIdNumber(data) {
    return request({
        url: '/register/driver/uploadIdNumber',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function getIdNumber() {
    return request({
        url: '/register/driver/getIdNumber',
        method: 'GET'
    })
}

export function addIdNumber(data) {
    return request({
        url: '/register/driver/addIdNumber',
        method: 'POST',
        data
    })
}

export function uploadDriverNumber(data) {
    return request({
        url: '/register/driver/uploadDriverNumber',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function getDriverNumber() {
    return request({
        url: '/register/driver/getDriverNumber',
        method: 'GET'
    })
}

export function addDriverNumber(data) {
    return request({
        url: '/register/driver/addDriverNumber',
        method: 'POST',
        data
    })
}

export function uploadVehicleRegNumber(data) {
    return request({
        url: '/register/driver/uploadVehicleRegNumber',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function getVehicle() {
    return request({
        url: '/register/driver/getVehicle',
        method: 'GET'
    })
}

export function addVehicle(data) {
    return request({
        url: '/register/driver/addVehicle',
        method: 'POST',
        data
    })
}

export function uploadPoliceRecCertificate(data) {
    return request({
        url: '/register/driver/uploadPoliceRecCertificate',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function uploadBankAccount(data) {
    return request({
        url: '/register/driver/uploadBankAccount',
        method: 'POST',
        headers: {
            "Content-Type":"multipart/form-data"
        },
        data
    })
}

export function addBank(data) {
    return request({
        url: '/register/driver/addBank',
        method: 'POST',
        data
    })
}

export function getBank() {
    return request({
        url: '/register/driver/getBank',
        method: 'GET'
    })
}

export function getDocs() {
    return request({
        url: '/register/driver/getDocs',
        method: 'GET'
    })
}

export function finishRegister() {
    return request({
        url: '/register/driver/finish',
        method: 'GET'
    })
}