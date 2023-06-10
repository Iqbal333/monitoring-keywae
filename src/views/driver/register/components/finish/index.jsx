import { Button, Card, Image, Typography, message } from 'antd'
import React from 'react'
import Success from '@/assets/images/bg-success.png'
import { finishRegister } from '@/api/register'

export default function Finish(props) {

    const [messageApi, contextHandler] = message.useMessage()

    const onFinish = () => {
        finishRegister()
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: results.data.message,
                        duration: 1
                    })
                    props.finishStep()
                } else {
                    messageApi.error({
                        content: results.data.message,
                        duration: 1
                    })
                }
            })
            .catch(err => {
                messageApi.error({
                    content: err.message,
                    duration: 1
                })
            })
    }

    return (
        <Card>
            {contextHandler}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Success} preview={false} width={250} />
                <div style={{ marginBottom: 10, marginTop: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography.Title>
                        Berhasil !
                    </Typography.Title>
                    <Typography.Text strong={true}>
                        Pendaftaran akun driver berhasil dibuat.
                    </Typography.Text>
                    <Typography.Text strong={true}>
                        Silahkan lakukan approval di daftar antrian driver.
                    </Typography.Text>
                </div>
                <Button type="primary" size="middle" onClick={onFinish}>
                    Finish
                </Button>
            </div>
        </Card>
    )
}
