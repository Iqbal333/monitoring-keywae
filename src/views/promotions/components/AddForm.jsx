import { Form, Modal, message } from 'antd'
import React from 'react'
import Promotion from '@/components/Form'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import DateGroup from './DateGroup'
import { useEffect } from 'react'
import { getPromotionType } from '@/api/master/promotionType'
import { getServiceType } from '@/api/master/globals'
import { addPromotion } from '@/api/promotions'

export default function AddForm(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [bannerPreview, setBannerPreview]   = useState(null)
    const [imagePreview, setImagePreview]     = useState(null)
    const [promotionTypes, setPromotionTypes] = useState([])
    const [setviceTypes, setServiceTypes]     = useState([])

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
            preview: bannerPreview,
            rules: [
                {
                    required: true
                }
            ]
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
            preview: imagePreview,
            rules: [
                {
                    required: true
                }
            ]
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
                values.startDate = values.date[0].format('YYYY-MM-DD')
                values.endDate = values.date[1].format('YYYY-MM-DD')
                addPromotion(values)
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
        title="ADD PROMOTION"
        open={props.open}
        onCancel={props.onCancel}
        onOk={handleModal}
        okText="Add"
        confirmLoading={props.confirmLoading}
        destroyOnClose={true}
        width={1000}
    >
        {contextHandler}
        <Promotion formLayout={formLayout} formRef={formRef} validateOnChange={false} inputs={inputs}>
            <Form.Item name={"promotionTimes"} key={"times"} rules={[{ required: true }]} valuePropName="value">
                <DateGroup />
            </Form.Item>
        </Promotion>
    </Modal>
  )
}
