import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import Group from './Group'

export default function DateGroup({ isEdit = false, defaultValue = [], onChange, value }) {

    const [totalTime, setTotalTime] = useState(1)
    const [times, setTimes]         = useState([])

    useEffect(() => {
        onChange?.(times)

        return () => {
            return false
        }
    },[times,totalTime])

    useMemo(() => {
        if (isEdit === true && defaultValue) {
            setTimes(defaultValue)
            setTotalTime(defaultValue?.length)
        }
    },[defaultValue])

    const onTimeChange = (e, index) => {
        if (times === undefined || times?.length === 0) {
            setTimes([e])
        } else {
            times[index] = e
        }
    }

    return (
        <Card title="Promotion Time">
            {[...Array(totalTime)].map((val, index) => (
                <>
                    <Group defaultValue={times[index]} onChange={(e) => onTimeChange(e, index)} />
                    <Button icon={<PlusOutlined />} style={{ marginLeft: 10, marginRight: 10 }} onClick={() => setTotalTime(val => val + 1)} />
                    {(totalTime > 1 && index > 0) && (<Button icon={<MinusOutlined />} onClick={() => {
                        if (times !== undefined || times.length > 1) {
                            times.splice(index,1)
                        }
                        if (totalTime === 1) {
                            setTotalTime(1)
                            return
                        }
                        setTotalTime(val => val - 1)
                    }} />)}
                </>
            ))}
        </Card>
    )
}
