import { Button, Card, message } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { getBanks } from '@/api/master/bank'
import UpdateForm from '@/components/Form'
import { updatedBank } from '@/api/drivers'

export default function BankInfo(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [driverId, setDriverId] = useState('')
    const [banks, setBanks] = useState([])

    useEffect(() => {
        getBanks()
            .then((res) => {
                if (res.data.success) {
                    setBanks(res.data.results)
                }
            })

        if (props.data) {
            setDriverId(props?.driverId)
            formRef.setFieldsValue(props.data)
        }
    },[])

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                values.driverId = driverId
                updatedBank(values)
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
            .catch(err => {
                messageApi.error({
                    content: err.message,
                    duration: 1
                })
            })
    }

    const inputs = [
        {
            name: 'bankId',
            key: 'bankId',
            label: 'Bank',
            type: 'select',
            fieldNames: {
                label: 'bankName',
                value: 'bankId'
            },
            options: banks,
            labelCol: {span: 6}
        },
        {
            name: 'bankAccount',
            key: 'bankAccount',
            label: 'Nomor Rekening',
            labelCol: {span: 6}
        },
        {
            name: 'bankAccountName',
            key: 'bankAccountName',
            label: 'Nama Pemilik',
            labelCol: {span: 6}
        }
    ]

    return (
        <Card>
            {contextHandler}
            <UpdateForm formRef={formRef} inputs={inputs}>
                <Button type='primary' style={{ alignItems: 'flex-end' }} onClick={onSubmit}>
                    Submit
                </Button>
            </UpdateForm>
        </Card>
    )
}
