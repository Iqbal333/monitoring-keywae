import React, { useState } from 'react';
import { Button, Modal, message, Image, Descriptions, Typography, Card, } from 'antd';
import noImage from '@/assets/images/no-image.png';
import { participantApprove } from '@/api/auction/auction/participantApprove';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils';

export default function DetailParticipant(props) {
    const [messageApi, contextHandler] = message.useMessage();

    const handleBtnApprove = () => {
        participantApprove({"auctionId" : props.dataPart?.auctionId, "participantId" : props.dataPart?.participantId})
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: 'Berhasil Menyetujui!',
                        duration: 1,
                    });
                    setTimeout(() => {
                        window.location.reload()
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
                title='Detail Pembayaran'
                open={props.open}
                onCancel={props.onCancel}
                okText='Complete'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    <Button key="complete" onClick={handleBtnApprove} style={{ backgroundColor: 'green', color: 'white', display: props.dataPart?.paymentStatus === "Paid" ? 'none' : "inline-block"}}>
                        Menyetujui
                    </Button>
                    // <Button key="complete" onClick={handleBtnBack} style={{ backgroundColor: 'red', color: 'white'}}>
                    //     Batal
                    // </Button>
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <div style={{ alignSelf: 'center'}}>
                        <Image
                            src={props.dataPart?.proofOfPaymentLink ?? noImage}
                            strong={true}
                            width={200}
                        />
                    </div>
                <Card>

                        <Descriptions bordered>
                        <Descriptions.Item
                            span={3}
                            label='Nama Lengkap'
                            labelStyle={{ fontWeight: '600' }}
                            strong={true}
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            { props.dataPart?.fullName ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Bank'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {props.dataPart?.bank ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Nomor Rekening'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {props.dataPart?.bankAccount ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                        labelStyle={{ fontWeight: '600' }} label='Nama Pemilik Bank'>
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {props.dataPart?.bankAccountName ?? '-'}
                            </Typography.Text>{' '}
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Tanggal Pembayaran'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                {dayjs(props.dataPart?.paymentDate,'YYYY-MM-DD').format('DD MMMM YYYY')}
                            </Typography.Text>{' '}
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Deposit'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                {toRupiah(props.dataPart?.deposit)}
                            </Typography.Text>
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Nomor Lelang'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                {props.dataPart?.auctionNo}
                            </Typography.Text>
                        </Descriptions.Item>
        
        
                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Nama Lelang'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                {props.dataPart?.lotName}
                            </Typography.Text>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                </div>
            </Modal>
        </>
    );
}
