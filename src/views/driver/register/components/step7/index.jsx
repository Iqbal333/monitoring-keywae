import { getDocs, uploadPoliceRecCertificate } from '@/api/register'
import { IS_EMPTY_OBJECT } from '@/utils/global'
import { Button, Card, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import FormStep from '@/components/Form'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

export default function Step7(props) {

    const [policeRecCertFile, setPoliceRecCertFile] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    useEffect(() => {
        getDocs()
            .then((res) => {
                if (res.data.success) {
                    if (IS_EMPTY_OBJECT({
                        policeRecCertificateFile: res.data.results.policeRecCertificateFile
                    }) === false) {
                        setPoliceRecCertFile(res.data.results.policeRecCertificateFile)
                        setIsEdit(true)
                    }
                }
            })
    }, [])

    const inputs = [
        {
            name: 'policeRecCertificateFile',
            key: 'policeRecCertificateFile',
            type: 'file',
            onFileChange: (value) => {
                setPoliceRecCertFile(URL.createObjectURL(value))
            },
            accept: 'image/png, image/jpeg',
            preview: policeRecCertFile,
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
                uploadPoliceRecCertificate(values)
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
