import React from 'react';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { rejectAuction } from '@/api/auction/auction/rejectAuction';

export default function Reject(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnReject = () => {
        rejectAuction({"auctionId" : props.auctionId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Lelang Berhasil Ditolak!',
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
                title='Tolak Lelang'
                open={props.open}
                onCancel={props.onCancel}
                okText='Add'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    <Button key="reject" onClick={handleBtnReject} style={{ backgroundColor: 'red', color: 'white'}}>
                        Tolak
                    </Button>
                ]}
            >
                <p style={{fontSize: '16px'}}>Apakah Anda akan menolak Lelang "{props.lotName}" ?.</p>
            </Modal>
        </>
    );
}
