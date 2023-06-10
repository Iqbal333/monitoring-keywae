import { Button, Card, message } from 'antd'
import React from 'react'
import FormStep from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { addDriverNumber, uploadDriverNumber } from '@/api/register'

export default function Step4(props) {
    
    const [driverNumberFile, setDriverNumberFile] = useState(null)

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    const validateNumber = async (_,values) => {
        if (!isNaN(parseInt(values))) {
            return Promise.resolve(values)
        }
        return Promise.reject(new Error('Invalid Number'))
    }

    const inputs = [
        {
            name: 'driverNumberFile',
            key: 'driverNumberFile',
            type: 'file',
            onFileChange: (values) => {
                setDriverNumberFile(URL.createObjectURL(values))
            },
            accept: 'image/png, image/jpeg',
            preview: driverNumberFile,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'driverNumber',
            key: 'driverNumber',
            placeHolder: 'Driver Number',
            rules: [
                {
                    required: true,
                    max: 16,
                    validator: validateNumber
                }
            ]
        },
        {
            name: 'driverNumberExp',
            key: 'driverNumberExp',
            type: 'datepicker',
            rules: [
                {
                    required: true
                }
            ]
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then(async (values) => {
                let driverNumberFile = await uploadDriverNumber(values)
                let driverNumberForm = await addDriverNumber(values)
                Promise.all(
                    [driverNumberFile,
                    driverNumberForm]
                ).then((res) => {
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
    }

    return (
        <Card>
            {contextHandler}
            <FormStep formRef={formRef} inputs={inputs} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type='default' onClick={props.prevStep} icon={<ArrowLeftOutlined />}>
                    Prev
                </Button>
                <Button type='primary' onClick={onSubmit} icon={<ArrowRightOutlined />}>
                    Next
                </Button>
            </div>
        </Card>
    )
}
