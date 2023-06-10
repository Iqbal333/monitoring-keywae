import { Button, Card, Col, Input, Row, Select, message } from 'antd'
import React, { Component } from 'react'
import UpdatedForm from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRegion } from '@/api/master/region'
import { getDistrict } from '@/api/master/district'
import { getSubDistrict } from '@/api/master/subDistrict'
import { getVillage } from '@/api/master/village'
import { updatedAddress } from '@/api/drivers'

const AddressInfo = (props) => {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [addressId, setAddressId] = useState('')
    const [regionId, setRegionId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [subDistrictId, setSubDistrictId] = useState('')
    const [region, setRegion] = useState([])
    const [district, setDistrict] = useState([])
    const [subDistrict, setSubDistrict] = useState([])
    const [village, setVillage] = useState([])

    useEffect(() => {
        getRegion()
            .then((res) => {
                if (res.data.success) {
                    setRegion(res.data.results)
                }
            })

        if (props?.data) {
            setAddressId(props.data.currentAddressId)
            setRegionId(props.data.currentRegionId)
            setDistrictId(props.data.currentDistrictId)
            setSubDistrictId(props.data.currentSubDistrictId)
            let data = props.data
            data.regionId = props.data.currentRegionId
            data.districtId = props.data.currentDistrictId
            data.subDistrictId = props.data.currentSubDistrictId
            data.villageId = props.data.currentVillageId
            data.address = props.data.currentAddress
            data.postalCode = props.data.currentPostalCode
            formRef.setFieldsValue(data)
        }
    },[])

    useEffect(() => {
        if (regionId) {
            getDistrict(regionId)
                .then((res) => {
                    if (res.data.success) {
                        setDistrict(res.data.results)
                    }
                })
        }
    },[regionId])

    useEffect(() => {
        if (districtId) {
            getSubDistrict(districtId)
                .then((res) => {
                    if (res.data.success) {
                        setSubDistrict(res.data.results)
                    }
                })
        }
    },[districtId])

    useEffect(() => {
        if (subDistrictId) {
            getVillage(subDistrictId)
                .then((res) => {
                    if (res.data.success) {
                        setVillage(res.data.results)
                    }
                })
        }
    },[subDistrictId])

    const inputs = [
        {
            name: 'address',
            key: 'address',
            label: 'Alamat',
            labelCol: {span: 6},
            type: 'textarea'
        },
        {
            name: 'regionId',
            key: 'regionId',
            label: 'Provinsi',
            labelCol: {span: 6},
            type: 'select',
            onChange: (value) => {
                setRegionId(value)
            },
            fieldNames: {
                label: 'name',
                value: 'regionId'
            },
            options: region
        },
        {
            name: 'districtId',
            key: 'districtId',
            label: 'Kabupaten/Kota',
            labelCol: {span: 6},
            type: 'select',
            onChange: (value) => {
                setDistrictId(value)
            },
            fieldNames: {
                label: 'name',
                value: 'districtId'
            },
            options: district
        },
        {
            name: 'subDistrictId',
            key: 'subDistrictId',
            label: 'Kecamatan',
            labelCol: {span: 6},
            onChange: (value) => {
                setSubDistrictId(value)
            },
            type: 'select',
            fieldNames: {
                label: 'name',
                value: 'subDistrictId'
            },
            options: subDistrict
        },
        {
            name: 'villageId',
            key: 'villageId',
            label: 'Kelurahan',
            labelCol: {span: 6},
            type: 'select',
            fieldNames: {
                label: 'name',
                value: 'villageId'
            },
            options: village
        },
        {
            name: 'postalCode',
            key: 'postalCode',
            label: 'Kode Pos',
            labelCol: {span: 6},
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                values.addressId = addressId
                updatedAddress(values)
                    .then((res) => {
                        if (res.data.success) {
                            messageApi.success({
                                content: res.data.message,
                                duration: 1
                            })
                        } else {
                            messageApi.error({
                                content: res.data.message,
                                duration: 1
                            })
                        }
                    })
                    .catch((err) => {
                        messageApi.error({
                            content: err.message,
                            duration: 1
                        })
                    })
            })
            .catch((err) => {
                messageApi.error({
                    content: err.message,
                    duration: 1
                })
            })
    }

    return (
        <Card>
            {contextHandler}
            <UpdatedForm formRef={formRef} inputs={inputs}>
                <Button type='primary' style={{ alignItems: 'flex-end' }} onClick={onSubmit}>
                    Submit
                </Button>
            </UpdatedForm>
        </Card>
    )
}

export default AddressInfo