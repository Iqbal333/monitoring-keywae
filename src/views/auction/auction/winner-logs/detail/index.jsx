import React, { useState } from 'react';
import { Button, Modal, message, Image, Descriptions, Typography, Card, Tabs } from 'antd';
import noImage from '@/assets/images/no-image.png';
import { toRupiah } from '@/utils';

export default function DetailWinnerLogs(props) {
    const [messageApi, contextHandler] = message.useMessage();

    console.log(props.datas)

    const handleBtnApprove = () => {
        // participantApprove({"auctionId" : props.dataPart?.auctionId, "participantId" : props.dataPart?.participantId})
        //     .then((results) => {
        //         if (results.data.success) {
        //             messageApi.success({
        //                 content: 'Berhasil Menyetujui!',
        //                 duration: 1,
        //             });
        //             setTimeout(() => {
        //                 window.location.reload()
        //             }, 1200)

        //         } else {
        //             messageApi.error({
        //               content: results.data.message,
        //               duration: 1,
        //             });
        //         }
        //     })
        //     .catch((errorInfo) => {
        //         messageApi.error({
        //             content: errorInfo.message,
        //             duration: 1,
        //         });
        //     });
    }
      const items = [
        {
          key: '1',
          label: `Informasi Kandidat`,
          children: 
            <Card>
                <Descriptions bordered>
                    <Descriptions.Item
                        span={3}
                        label='NPL'
                        labelStyle={{ fontWeight: '600' }}
                        strong={true}
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        { props.datas?.nplNo ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Nama Lengkap'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {props.datas?.fullName ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        },
        {
          key: '2',
          label: `Informasi Lelang`,
          children:
            <Card>
                <Descriptions bordered>
                    <Descriptions.Item
                        span={3}
                        label='NPL'
                        labelStyle={{ fontWeight: '600' }}
                        strong={true}
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        { props.datas?.nplNo ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Nomor Lelang'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {props.datas?.auctionNo ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Nama Lelang'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {props.datas?.lotName ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Status Beli'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {props.datas?.buyStatus ?? '-'}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Deposit'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {toRupiah(props.datas?.deposit)}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Bid'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {toRupiah(props.datas?.bid)}
                        </Typography.Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                        span={3}
                        labelStyle={{ fontWeight: '600' }}
                        label='Pelunasan'
                    >
                        <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {toRupiah(props.datas?.repayment)}
                        </Typography.Text>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        },
        {
          key: '3',
          label: `Informasi Bank`,
          children: 
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div style={{ alignSelf: 'center', width: '200px', height: '200px', border: '1px solid lightGray'}}>
                    <Image
                        src={props.datas?.proofOfPaymentLink ?? noImage}
                        strong={true}
                        width={200}
                    />
                </div>
                <Card>
                    <Descriptions bordered>
                        <Descriptions.Item
                            span={3}
                            label='Bank'
                            labelStyle={{ fontWeight: '600' }}
                            strong={true}
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            { props.datas?.bank ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>

                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Nomor Rekening'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {props.datas?.bankAccount ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>

                        <Descriptions.Item
                            span={3}
                            labelStyle={{ fontWeight: '600' }}
                            label='Nama Pemilik Bank'
                        >
                            <Typography.Text strong={true} style={{ fontSize: 15 }}>
                            {props.datas?.bankAccountName ?? '-'}
                            </Typography.Text>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        },
      ];

    return (
        <>
            {contextHandler}
            <Modal
                title='Detail Kandidat'
                open={props.open}
                onCancel={props.onCancel}
                okText='Complete'
                confirmLoading={props.confirmLoading}
                destroyOnClose={true}
                footer={[
                    // <Button key="complete" onClick={handleBtnApprove} style={{ backgroundColor: 'green', color: 'white', display: props.dataPart?.paymentStatus === "Paid" ? 'none' : "inline-block"}}>
                    //     Menyetujui
                    // </Button>
                ]}
            >
                <Tabs type="card" defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
}
