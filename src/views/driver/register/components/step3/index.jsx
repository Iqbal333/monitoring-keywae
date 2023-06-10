import { getDocs, uploadDriverPhoto } from '@/api/register'
import { IS_EMPTY_OBJECT } from '@/utils/global'
import { Button, Card, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import FormStep from '@/components/Form'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

export default function Step5(props) {

    const [driverPhotoPreview, setDriverPhotoPreview] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    useEffect(() => {
        getDocs()
            .then((res) => {
                if (res.data.success) {
                    if (IS_EMPTY_OBJECT({
                        driverPhoto: res.data.results.driverPhoto
                    }) === false) {
                        setDriverPhotoPreview(res.data.results.driverPhoto)
                        setIsEdit(true)
                    }
                }
            })
    }, [])

    const inputs = [
        {
            name: 'driverPhoto',
            key: 'driverPhoto',
            type: 'file',
            onFileChange: (value) => {
                setDriverPhotoPreview(URL.createObjectURL(value))
            },
            accept: 'image/png, image/jpeg',
            preview: driverPhotoPreview,
            rules: [
                {
                    required: !isEdit
                }
            ]
        }
    ]

    const onSubmit = () => {
        formRef.validateFields()
            .then((values) => {
                uploadDriverPhoto(values)
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
    }

    return (
        <Card>
            {contextHandler}
            <FormStep inputs={inputs} formRef={formRef} />
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
