import { Button, Image } from 'antd'
import React, { useState } from 'react'
import noImage from '@/assets/images/no-image.png'
import { useEffect } from 'react'

export default function CardSelect({ selectLabel = "", onChange, value, defaultValue, options = [], fieldNames = {} }) {

    const [option, setOption] = useState([])
    
    useEffect(() => {
        setOption(options)

        return () => {
            return false
        }
    },[options])

    useEffect(() => {
        onChange?.(defaultValue)

        return () => {
            return false
        }
    }, [defaultValue])

    useEffect(() => {
        if (fieldNames?.label !== undefined && fieldNames?.value !== undefined) {
            options?.map((val, index) => {
                val.label = val[fieldNames?.label]
                val.value = val[fieldNames?.value]
                return val
            })
        }
    },[fieldNames])

    return (
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
            {option.map((val, index) => (
                <Button key={index} type={val?.value === value ? "primary" : "default"} style={{ height: '100%', marginLeft: 5, marginRight: 5 }} onClick={() => onChange?.(val?.value)}>
                    <div style={{ display: 'flex', flex: 0, justifyContent: 'center' }}>
                        {val?.icon && (
                            <Image src={val?.icon ? val?.icon : noImage} preview={false} style={{ maxHeight: 50 }} />
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', marginLeft: 10 }}>
                            <span style={{ fontWeight: (val?.value === value) ? 'bold':'normal', fontSize: 14 }}>{val?.label}</span>
                            <span style={{ fontWeight: (val?.value === value) ? 'normal':'lighter', fontSize: 14 }}>{val?.description}</span>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    )
}
