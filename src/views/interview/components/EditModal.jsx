import { getInterviewSchedule, updateInterview } from '@/api/interview'
import { Form, message, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import InterviewForm from '@/components/Form'
import ListDriver from './ListDriver'

export default function EditModal(props) {

    const [formRef] = Form.useForm()

    const [Message, contextHandler] = message.useMessage()
    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        getInterviewSchedule(props.interviewsId).then(res => {
            if (res.data.success) {
                setSchedules(res.data.results)
            } else {
                Message.error({
                    content: res.data.message,
                    duration: 1000
                })
            }
        }).catch(err => {
            Message.error({
                content: err.message,
                duration: 1000
            })
        })

        return () => {
            formRef.setFieldsValue(props.initialValues)
        }
    }, [props.interviewsId, props.open])


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
                    values.schedules = values.schedules === undefined ? []:values.schedules
                    values.interviewsId = props.interviewsId
                    values.startTime = values.startTime.format('HH:mm')
                    values.endTime = values.endTime.format('HH:mm')
                    values.scheduleDate = values.scheduleDate.format('DD-MM-YYYY')
                    updateInterview(values).then(results => {
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
                }).catch(err => {
                    console.log(err)
                    Message.open({
                        type: 'error',
                        content: err.message
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
            width={1000}
        >
            {contextHandler}
            <InterviewForm formRef={formRef} name="edit-interview" formLayout={formLayout} initValues={props.initialValues} inputs={inputs}>
                <Form.Item name={"schedules"} rules={[{
                    type: 'array'
                }]}>
                    <ListDriver interviewsId={props.interviewsId} defaultValue={schedules} />
                </Form.Item>
            </InterviewForm>
        </Modal>
    )
}
