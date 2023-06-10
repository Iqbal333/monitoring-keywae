import { Card, Image } from 'antd'
import React from 'react'
import noImage from '@/assets/images/no-image.png'

export default function FileInput({ preview, onChange, value, accept }) {

    const onFileChange = (e) => {
        if (e.target.files) {
            onChange?.(e.target.files[0])
        }
    }

  return (
    <Card>
        <Image src={preview ? preview:noImage} width={150} />
        <input type="file" onChange={onFileChange} accept={accept} style={{ marginTop: 10 }} />
    </Card>
)
}
