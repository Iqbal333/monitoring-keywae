import { toRupiah } from '@/utils'
import { Avatar, Button, Card, Col, Descriptions, Image, Row, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import noImage from '@/assets/images/no-image.png'
import { getOrderById } from '@/api/shops/orders'
import { useState } from 'react'
import dayjs from 'dayjs'
import './index.less'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function DetailOrder(props) {
    
    const [data, setData] = useState({})

    useEffect(() => {
        if (props.match.params.id) {
            getOrderById(props.match.params.id)
                .then((results) => {
                    console.log(results)
                    if (results.data.success) {
                        setData(results.data.results)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    },[props.match.params.id])

    const columns = [
        {
            title: '#',
            dataIndex: 'images',
            render: ({ productImageFile }) => <Avatar src={productImageFile ? productImageFile:noImage} shape='square' style={{ width: 70, height: 70 }} />
        },
        {
            title: 'Nama Produk',
            dataIndex: 'productName'
        },
        {
            title: 'Harga',
            dataIndex: 'productPrice'
        },
        {
            title: 'Berat',
            dataIndex: 'weight'
        },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal',
            render: (_) => _ ? toRupiah(_):toRupiah(0)
        },
    ]

  return (
    <div className='app-container'>
        <Button type='default' icon={<ArrowLeftOutlined />} onClick={() => window.history.back()}>
            Kembali
        </Button>
        <Row gutter={5} style={{ marginBottom: 15, marginTop: 10 }}>
            <Col span={8}>
                <Card title='Informasi Pelanggan'>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label='Nama Lengkap'>{data?.customer?.fullName ?? '-'}</Descriptions.Item>
                        <Descriptions.Item label='Tanggal Lahir'>{data?.customer?.birthDate ? dayjs(data?.customer?.birthDate).format('DD MMMM YYYY'):'-'}</Descriptions.Item>
                        <Descriptions.Item label='Jenis Kelamin'>{data?.customer?.sex ?? '-'}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <div style={{ marginBottom: 5, marginTop: 5 }} />
                <Card title='Informasi Toko'>
                    <Avatar src={data?.orderItems?.storeImage ? data?.orderItems?.storeImage:noImage} shape='square' size='large' style={{ width:100, height:100, marginBottom: 10 }} />
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label='Nama Toko'>{data?.orderItems?.storeName ?? '-'}</Descriptions.Item>
                        <Descriptions.Item label='Lokasi Toko'>{data?.orderItems?.storeLocation ?? '-'}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
            <Col span={16}>
                <Card>
                    <Descriptions title='Informasi Pengiriman' bordered size='small' layout='vertical' style={{ marginBottom: 10 }}>
                        <Descriptions.Item label='Jasa Pengirim'>{data?.orderItems?.shippingCost?.courierName ?? '-'}</Descriptions.Item>
                        <Descriptions.Item label='Layanan'>{data?.orderItems?.shippingCost?.shippingService ?? '-'}</Descriptions.Item>
                        <Descriptions.Item label='Harga'>{data?.orderItems?.shippingCost?.shippingPrice ? toRupiah(data?.orderItems?.shippingCost?.shippingPrice):toRupiah(0)}</Descriptions.Item>
                        <Descriptions.Item label='No. Resi'>{data?.orderItems?.shippingCost?.waybillId ?? '-'}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title='Informasi Pembayaran' bordered size='small' layout='vertical' style={{ marginBottom: 10 }}>
                        <Descriptions.Item label='Metode Pembayaran'>
                            <Image src={data?.orderItems?.payments?.paymentImgUrl ? data?.orderItems?.payments?.paymentImgUrl:noImage} shape='square' size='large' style={{ width:70, height:25 }} /> {data?.orderItems?.payments?.paymentMethod ?? '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label='Tanggal Pembayaran'>{data?.orderItems?.payments?.transactionDate ? dayjs(data?.orderItems?.payments?.transactionDate).format('DD MMMM YYYY HH:mm'):'-'}</Descriptions.Item>
                        <Descriptions.Item label='Tanggal Jatuh Tempo'>{data?.orderItems?.payments?.transactionExpDate ? dayjs(data?.orderItems?.payments?.transactionExpDate).format('DD MMMM YYYY HH:mm'):'-'}</Descriptions.Item>
                        <Descriptions.Item label='Total Pembayaran'>{data?.orderItems?.payments?.total ? toRupiah(data?.orderItems?.payments?.total):toRupiah(0)}</Descriptions.Item>
                        <Descriptions.Item label='Status Pembayaran'><Tag>{data?.orderItems?.payments?.status ?? '-'}</Tag></Descriptions.Item>
                    </Descriptions>
                    <Table
                        scroll={{ y: 600 }}
                        size='small'
                        expandable={false}
                        dataSource={data?.orderItems?.products ?? []}
                        columns={columns}
                    />
                </Card>
            </Col>
        </Row>
    </div>
  )
}
