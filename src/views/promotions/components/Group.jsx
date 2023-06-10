import { Select, Space, TimePicker } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Group({ defaultValue, onChange, value }) {

    const [name, setName]               = useState("")
    const [time, setTime]               = useState({})
    const [defaultTime, setDefaultTime] = useState([])

    const onSelected = (e) => {
        setName(e)
    }

    const onTimeChange = (e) => {
        setTime({
            startTime: e[0].format('HH:mm:ss'),
            endTime: e[1].format('HH:mm:ss')
        })
    }

    useEffect(() => {
        if (name !== "" && (time?.startTime || time?.endTime)) {
            onChange({ name: name, ...time })
        }
    },[name, time, defaultTime])

    useEffect(() => {
        if (defaultValue?.name !== "" && (defaultValue?.startTime || defaultValue?.endTime)) {
            setName(defaultValue?.name)
            setTime({
                startTime: defaultValue?.startTime,
                endTime: defaultValue?.endTime
            })
            setDefaultTime([dayjs(defaultValue?.startTime,'HH:mm:ss'),dayjs(defaultValue?.endTime,'HH:mm:ss')])
        }
    },[defaultValue])

    return (
        <Space direction="horizontal" style={{ marginBottom: 10 }}>
            <Select defaultValue={defaultValue?.name ?? ''} style={{ width: 150 }} onChange={onSelected} options={[
                {
                    label: 'Sore',
                    value: 'Sore'
                },
                {
                    label: 'Pagi',
                    value: 'Pagi'
                },
                {
                    label: 'Siang',
                    value: 'Siang'
                },
                {
                    label: 'Malam',
                    value: 'Malam'
                }
            ]} />
            <TimePicker.RangePicker allowClear={false} defaultValue={(defaultValue?.startTime || defaultValue?.endTime) ? [dayjs(defaultValue?.startTime,'HH:mm:ss'),dayjs(defaultValue?.endTime,'HH:mm:ss')]:[]} onChange={onTimeChange} />
        </Space>
    )
}
