import { addInterview, getInterviewDriver } from '@/api/interview'
import { Form, message, Modal } from 'antd'
import React from 'react'
import InterviewForm from '@/components/Form'
import ListDriver from './ListDriver'

export default function AddModal(props) {

    const [formRef] = Form.useForm()

    const [Message, contextHandler] = message.useMessage()

    const formLayout = {
        labelCol: {
          sm: { span: 7 },
        },
        wrapperCol: {
          sm: { span: 24 },
        },
    };

    const inputs = [
        {
            name: 'scheduleDate',
            label: 'Schedule Date',
            type: 'datepicker',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'quota',
            label: 'Quota',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'startTime',
            label: 'Start Time',
            type: 'timepicker',
            format: 'HH:mm',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'endTime',
            label: 'End Time',
            type: 'timepicker',
            format: 'HH:mm',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'location',
            label: 'Location',
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            name: 'locationLink',
            label: 'Location Link',
            extra: 'Link share location, can get from Google Maps.',
            rules: [
                {
                    required: true
                }
            ]
        },
    ];

    const handleSubmit = () => {
        if (formRef !== undefined) {
            formRef.validateFields()
                .then((values) => {
                    values.startTime = values.startTime.format('HH:mm')
                    values.endTime = values.endTime.format('HH:mm')
                    values.scheduleDate = values.scheduleDate.format('DD-MM-YYYY')
                    console.log(values)
                    addInterview(values).then(results => {
                        if (results.data.success) {
                            Message.open({
                              type: 'success',
                              content: results.data.message
                            })
                            setTimeout(() => {
                              props.refresh()
                              formRef.resetFields()
                            }, 1000)
                          } else {
                            Message.open({
                              type: 'error',
                              content: results.data.message
                            })
                          }
                    })
                })
        }
    } 

    return (
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            onOk={handleSubmit}
            okText="Save"
            destroyOnClose={true}
            confirmLoading={props.confirmLoading}
            width={1000}
        >
            {contextHandler}
            <InterviewForm formRef={formRef} name="add-interview" formLayout={formLayout} inputs={inputs}>
                <Form.Item name={"schedules"} rules={[{
                    required: true,
                    type: 'array'
                }]}>
                    <ListDriver />
                </Form.Item>
            </InterviewForm>
        </Modal>
    )
}
