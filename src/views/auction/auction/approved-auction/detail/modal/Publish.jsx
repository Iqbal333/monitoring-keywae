import React from 'react';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { publishAuction } from '@/api/auction/auction/publishAuction';

export default function Publish(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnPublish = () => {
        publishAuction({"auctionId" : props.auctionId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Lelang Berhasil Diterbitkan!',
                        duration: 1,
                    });
                    setTimeout(() => {
                        window.history.back()
                    }, 1200)

                } else {
                    messageApi.error({
                      content: results.data.message,
                      duration: 1,
                    });
                }
            })
            .catch((errorInfo) => {
                messageApi.error({
                    content: errorInfo.message,
                    duration: 1,
                });
            });
    }

    return (
        <>
            {contextHandler}
            <Modal
                title='Terbitkan Lelang'
                open={props.open}
                onCancel={props.onCancel}
                okText='Add'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    <Button key="reject" onClick={handleBtnPublish} style={{ backgroundColor: 'blue', color: 'white'}}>
                        Terbitkan
                    </Button>
                ]}
            >
                <p style={{fontSize: '16px'}}>Apakah Anda akan menerbitkan Lelang "{props.lotName}" ?.</p>
            </Modal>
        </>
    );
}
