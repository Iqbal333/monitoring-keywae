import React from 'react';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { closedAuction } from '@/api/auction/auction/closedAuction';

export default function Complete(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnReject = () => {
        closedAuction({"auctionId" : props.auctionId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Lelang Berhasil Diselesaikan!',
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
                title='Selesaikan Lelang'
                open={props.open}
                onCancel={props.onCancel}
                okText='Complete'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    <Button key="complete" onClick={handleBtnReject} style={{ backgroundColor: 'green', color: 'white'}}>
                        Selesaikan
                    </Button>
                ]}
            >
                <p style={{fontSize: '16px'}}>Apakah Anda akan menyelesaikan Lelang "{props.lotName}" ?.</p>
            </Modal>
        </>
    );
}
