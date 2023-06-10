import { Button, Card, Col, Input, Row, Select, message } from 'antd'
import React from 'react'
import InputGroup from '../InputGroup'
import UpdateForm from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useState } from 'react'
import { getGender } from '@/api/master/gender'
import dayjs from 'dayjs'
import { updatedBiodata } from '@/api/drivers'

export default function PersonalInfo(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [gender, setGender] = useState([])
    const [driverId, setDriverId] = useState(null)

    useState(() => {
        getGender()
            .then((res) => {
                if (res.data.success) {
                    setGender(res.data.results)
                }
            })

        if (props?.data) {
            setDriverId(props?.driverId)
            props.data.birthDate = dayjs(props?.data?.birthDate,'YYYY-MM-DD')
            formRef.setFieldsValue(props.data)
        }

        return () => {
            return false
        }
    },[])

    const inputs = [
        {
            name: 'fullName',
            label: 'Nama Lengkap',
            key: 'fullName',
            placeholder: 'Nama Lengkap',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'phoneNumber',
            label: 'Nomor Telepon',
            key: 'phoneNumber',
            placeholder: 'Nomor Telepon',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'phoneNumberSecondary',
            label: 'Nomor Telepon Alternatif',
            key: 'phoneNumberSecondary',
            placeholder: 'Nomor Telepon Alternatif',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'email',
            label: 'Email',
            key: 'email',
            placeholder: 'Email',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'birthPlace',
            label: 'Tempat Lahir',
            key: 'birthPlace',
            placeholder: 'Tempat Lahir',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'email',
            label: 'Email',
            key: 'email',
            placeholder: 'Email',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'birthDate',
            label: 'Tanggal Lahir',
            key: 'birthDate',
            placeholder: 'Tanggal Lahir',
            type: 'datepicker',
            labelCol: { span: 6 },
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'genderId',
            label: 'Jenis Kelamin',
            key: 'genderId',
            labelCol: { span: 6 },
            type: 'select',
            fieldNames: {
                label: 'gender',
                value: 'genderId'
            },
            rules: [
                {
                    required: true
                }
            ],
            options: gender
        }
    ]

    const onSubmit = () => {
        if (formRef) {
            formRef.validateFields()
                .then((values) => {
                    values.driverId = driverId
                    values.birthDate = values.birthDate.format('YYYY-MM-DD')
                    updatedBiodata(values)
                        .then(res => {
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
                        .catch(err => {
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
    }

    return (
        <Card>
            {contextHandler}
            <UpdateForm formRef={formRef} inputs={inputs} >
                <Button type='primary' style={{ alignItems: 'flex-end' }} onClick={onSubmit}>
                    Submit
                </Button>
            </UpdateForm>
        </Card>
    )
}
