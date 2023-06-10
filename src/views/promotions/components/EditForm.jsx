import { Form, Modal, message } from 'antd'
import React from 'react'
import Promotion from '@/components/Form'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import DateGroup from './DateGroup'
import { useEffect } from 'react'
import { getPromotionType } from '@/api/master/promotionType'
import { getServiceType } from '@/api/master/globals'
import { getPromotion, updatePromotion } from '@/api/promotions'
import dayjs from 'dayjs'

export default function EditModal(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [bannerPreview, setBannerPreview]   = useState(null)
    const [imagePreview, setImagePreview]     = useState(null)
    const [promotionTypes, setPromotionTypes] = useState([])
    const [setviceTypes, setServiceTypes]     = useState([])
    const [promotionTimes, setPromotionTimes] = useState([])

    useEffect(() => {
        getPromotionType()
            .then((res) => {
                setPromotionTypes(res.data.results)
            })
        
        getServiceType()
            .then((res) => {
                setServiceTypes(res.data.results)
            })

        return () => {
            return false
        }
    },[])

    useEffect(() => {
        if (props?.promotionId) {
            getPromotion(props.promotionId)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        let data  = res.data.results
                        data.date = [dayjs(data.startDate, 'YYYY-MM-DD'),dayjs(data.endDate, 'YYYY-MM-DD')]
                        setBannerPreview(data.bannerImageUrl)
                        setImagePreview(data.imageUrl)
                        setPromotionTimes(data.promotionTimes)
                        delete data.bannerImageUrl
                        delete data.imageUrl
                        formRef.setFieldsValue(res.data.results)
                    }
                })
                .catch((err) => {
                    messageApi.error({
                        content: err.message,
                        duration: 1
                    })
                })
        }

        return () => {
            setPromotionTimes([])
            return false
        }
    },[props.promotionId])

    const formLayout = {
        enctype: 'multipart/form-data'
    }
    
    const inputs = [
        {
            name: 'name',
            key: 'name',
            labelCol: { span: 6 },
            label: 'Promotion Name',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'value',
            key: 'value',
            labelCol: { span: 6 },
            label: 'Promotion Value',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'description',
            key: 'description',
            labelCol: { span: 6 },
            label: 'Description',
            type: 'textarea',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'date',
            key: 'date',
            labelCol: { span: 6 },
            label: 'Promotion Date',
            type: 'datepicker-range',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'bannerImageUrl',
            key: 'bannerImageUrl',
            labelCol: { span: 6 },
            label: 'Promotion Banner',
            type: 'file',
            onFileChange: (value) => {
                setBannerPreview(URL.createObjectURL(value))
            },
            preview: bannerPreview
        },
        {
            name: 'imageUrl',
            key: 'imageUrl',
            labelCol: { span: 6 },
            label: 'Promotion Image',
            type: 'file',
            onFileChange: (value) => {
                setImagePreview(URL.createObjectURL(value))
            },
            preview: imagePreview
        },
        {
            name: 'promotionTypeId',
            key: 'promotionTypeId',
            labelCol: { span: 6 },
            label: 'Promotion Type',
            type: 'select',
            fieldNames: {
                label: 'promotionTypeName',
                value: 'promotionTypeId'
            },
            options: promotionTypes,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'serviceTypeId',
            key: 'serviceTypeId',
            labelCol: { span: 6 },
            label: 'Promotion Service App',
            type: 'select',
            fieldNames: {
                label: 'serviceTypeName',
                value: 'serviceTypeId'
            },
            options: setviceTypes,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'voucherCode',
            key: 'voucherCode',
            labelCol: { span: 6 },
            label: 'Voucher Code',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'isNominal',
            key: 'isNominal',
            labelCol: { span: 6 },
            label: 'Nominal Type',
            type: 'select',
            options: [
                {
                    label: 'Yes',
                    value: true
                },
                {
                    label: 'No',
                    value: false
                }
            ],
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'rates',
            key: 'rates',
            labelCol: { span: 6 },
            label: 'Rate',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'maxRates',
            key: 'maxRates',
            labelCol: { span: 6 },
            label: 'Max Rate',
            rules: [
                {
                    required: true
                }
            ]
        }
    ]


    const handleModal = () => {
        formRef.validateFields()
            .then((values) => {
                values.promotionId = props.promotionId
                values.startDate = values.date[0].format('YYYY-MM-DD')
                values.endDate = values.date[1].format('YYYY-MM-DD')
                updatePromotion(values)
                    .then((res) => {
                        if (res.data.success) {
                            messageApi.success({
                                content: res.data.message,
                                duration: 1
                            })
                            props.refresh()
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
    <Modal
        title="EDIT PROMOTION"
        open={props.open}
        onCancel={props.onCancel}
        onOk={handleModal}
        okText="Save"
        confirmLoading={props.confirmLoading}
        destroyOnClose={true}
        forceRender={true}
        width={1000}
    >
        {contextHandler}
        <Promotion formLayout={formLayout} formRef={formRef} validateOnChange={false} inputs={inputs}>
            <Form.Item name={"promotionTimes"} key={"times"} rules={[{ required: true }]} valuePropName="value">
                <DateGroup isEdit={true} defaultValue={promotionTimes} />
            </Form.Item>
        </Promotion>
    </Modal>
  )
}
