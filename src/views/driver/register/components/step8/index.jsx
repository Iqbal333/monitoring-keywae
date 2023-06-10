import { Button, Card, message } from 'antd'
import React, { useEffect, useState } from 'react'
import FormStep from '@/components/Form'
import { addBank, getBank, uploadBankAccount } from '@/api/register'
import { useForm } from 'antd/es/form/Form'
import { getBanks } from '@/api/master/bank'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

export default function Step8(props) {

    const [formRef]                    = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const [banks, setBanks] = useState([])
    const [bankPreview, setBankPreview] = useState(null)

    useEffect(() => {
        getBanks()
            .then((results) => {
                if (results.data.success) {
                    setBanks(results.data.results)
                }
            })
        
        getBank()
            .then((res) => {
                if (res.data.success) {
                    formRef.setFieldsValue(res.data.results)
                }
            })
    },[])


    const validateNumber = async (_,values) => {
        if (!isNaN(parseInt(values))) {
            return Promise.resolve(values)
        }
        return Promise.reject(new Error('Invalid Number'))
    }
 
    const inputs = [
        {
            name: 'bankAccountFile',
            key: 'bankAccountFile',
            type: 'file',
            accept: 'image/png, image/jpeg',
            onFileChange: (values) => {
                setBankPreview(URL.createObjectURL(values))
            },
            preview: bankPreview,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            labelCol: { span: 6 },
            name: 'bankId',
            key: 'bankId',
            label: 'Bank',
            fieldNames: {
                label: 'bankName',
                value: 'bankId'
            },
            type: 'select',
            options: banks.filter(val => val?.bankId === '1dff8378-2d6a-3a64-1144-61947856a295'),
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            labelCol: { span: 6 },
            name: 'bankAccount',
            key: 'bankAccount',
            label: 'Nomor Rekening',
            rules: [
                {
                    required: true,
                    validator: validateNumber
                }
            ]
        },
        {
            labelCol: { span: 6 },
            name: 'bankAccountName',
            key: 'bankAccountName',
            label: 'Nama Lengkap Pemilik',
            rules: [
                {
                    required: true
                }
            ]
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                Promise.all([uploadBankAccount(values),addBank(values)])
                    .then((results) => {
                        if (results[0].data.success) {
                            messageApi.success({
                                content: results[0].data.message,
                                duration: 1
                            })
                            props.refresh()
                        } else {
                            messageApi.error({
                                content: results[0].data.message,
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
    }

  return (
    <Card>
        {contextHandler}
        <FormStep formRef={formRef} inputs={inputs} />
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <Button type="default" onClick={props.prevStep} icon={<ArrowLeftOutlined />}>
                Previous
            </Button>
            <Button type="primary" onClick={onSubmit}>
                Next
                <ArrowRightOutlined />
            </Button>
        </div>
    </Card>
  )
}
