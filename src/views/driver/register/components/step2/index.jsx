import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, message } from 'antd'
import React from 'react'
import FormStep from '@/components/Form'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { addBiodata, getBiodata } from '@/api/register'

export default function Step2(props) {

    const [formRef] = useForm()
    const [messageApi, contextHandler] = message.useMessage()

    useEffect(() => {
      getBiodata()
        .then((res) => {
          if (res.data.success) {
            formRef.setFieldsValue(res.data.results)
          }
        })
    },[])

    const validateNumber = async (_,value) => {
        if (!isNaN(parseInt(value))) {
            return Promise.resolve(value)
        }
        return Promise.reject(new Error('Invalid Number'))
    }

    const inputs = [
      {
        name: 'fullName',
        key: 'fullName',
        labelCol: { span: 6 },
        placeHolder: 'Nama Lengkap',
        label: 'Nama Lengkap',
        rules: [
          {
            required: true
          }
        ]
      },
      {
        name: 'email',
        key: 'email',
        labelCol: { span: 6 },
        placeHolder: 'Email',
        label: 'Email',
        rules: [
          {
            required: true,
          }
        ]
      },
      {
        name: 'phoneNumber',
        key: 'phoneNumber',
        labelCol: { span: 6 },
        placeHolder: 'Nomor Telepon',
        label: 'Nomor Telepon',
        rules: [
          {
            required: true,
            validator: validateNumber
          }
        ]
      },
      {
        name: 'altPhoneNumber',
        key: 'altPhoneNumber',
        labelCol: { span: 6 },
        placeHolder: 'Nomor Telepon Alternatif',
        label: 'Nomor Telepon Alternatif',
        rules: [
          {
            required: true,
            validator: validateNumber
          }
        ]
      }
    ]

    const onSubmit = () => {
      formRef.validateFields()
        .then((values) => {
          addBiodata(values)
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
        <FormStep formRef={formRef} formLayout={{ size: 'middle' }} inputs={inputs} />
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
