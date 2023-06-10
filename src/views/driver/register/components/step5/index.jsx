import { Button, Card, message } from 'antd'
import React from 'react'
import FormStep from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { addDriverNumber, getDocs, getDriverNumber, uploadDriverNumber } from '@/api/register'
import { useEffect } from 'react'
import { IS_EMPTY_OBJECT } from '@/utils/global'
import dayjs from 'dayjs'

export default function Step4(props) {
    
    const [driverNumberFile, setDriverNumberFile] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    useEffect(() => {
        getDriverNumber()
            .then((res) => {
                if (res.data.success) {
                    let data = res.data.results
                    data.driverNumberExp = data.driverNumberExp ? dayjs(data.driverNumberExp,'YYYY-MM-DD') : dayjs()
                    formRef.setFieldsValue(res.data.results)
                }
            })

        getDocs()
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    if (IS_EMPTY_OBJECT({
                        driverNumberFile: res.data.results.driverNumberFile
                    }) === false) {
                        setDriverNumberFile(res.data.results.driverNumberFile)  
                        setIsEdit(true)                      
                    }
                }
            })

        return () => {
            return false
        }
    },[])

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
                    required: !isEdit
                }
            ]
        },
        {
            name: 'driverNumber',
            key: 'driverNumber',
            placeHolder: 'No. SIM',
            label: 'No. SIM',
            labelCol: { span: 6 },
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
            placeHolder: 'Tanggal Berakhir',
            label: 'Tanggal Berakhir',
            labelCol: { span: 6 },
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
                values.driverNumberExp = values.driverNumberExp.format('YYYY-MM-DD')
                Promise.all([uploadDriverNumber(values),addDriverNumber(values)])
                    .then((res) => {
                        if (res[0].data.success) {
                            messageApi.success({
                                content: res[0].data.message,
                                duration: 1
                            })
                            props.refresh()
                        } else {
                            messageApi.error({
                                content: res[0].data.message,
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
                <Button type="primary" onClick={onSubmit}>
                    Next
                    <ArrowRightOutlined />
                </Button>
            </div>
        </Card>
    )
}
