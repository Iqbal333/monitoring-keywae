import { Card, Col, Descriptions, Row, Table, Tabs } from 'antd'
import React from 'react'
import './index.less'
import CountUp from 'react-countup'
import { toRupiah } from '@/utils'
import { useEffect } from 'react'
import { getSellerById } from '@/api/shops/partner'
import { useState } from 'react'

export default function DetailSeller(props) {

    const [store, setStore] = useState({});
    const [dashboard, setDashboard] = useState({});
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (props.match.params.id) {
            getSellerById(props.match.params.id)
                .then((results) => {
                    if (results.data.success) {
                        setStore(results.data.storeInfo);
                        setDashboard(results.data.dashboard);
                        setProducts(results.data.storeProducts);
                        setReviews(results.data.storeReview);
                    }
                })   
        }
    },[props.match.params.id]);

    return (
        <div className='app-container'>
            <Row gutter={5}>
                <Col span={16}>
                    <div className='panel-card'>
                        <Card title='Pesanan Baru'>
                            <CountUp end={dashboard?.neworder ?? 0} />
                        </Card>
                        <Card title='Produk Terjual'>
                            <CountUp end={dashboard?.selledproduct ?? 0} />
                        </Card>
                        <Card title='Pendapatan'>
                            <CountUp end={dashboard?.successamount ?? 0} />
                        </Card>
                    </div>
                    <Card style={{ marginTop: 10, marginBottom: 10, maxHeight: 500 }}>
                        <Tabs
                            title='Statistik Toko'
                            items={[
                                {
                                    label: 'Daftar Produk',
                                    key: 'products',
                                    children: <ListProducts data={products} />
                                },
                                {
                                    label: 'Ulasan',
                                    key: 'reviews',
                                    children: <StoreReviews data={reviews} />
                                }
                            ]}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title='Informasi Toko' style={{ margin: 10 }}>
                        <Descriptions layout='horizontal' bordered column={1}>
                            <Descriptions.Item label='Nama Toko'>{store?.store_name ?? '-'}</Descriptions.Item>
                            <Descriptions.Item label='Slogan'>{store?.slogan ?? '-'}</Descriptions.Item>
                            <Descriptions.Item label='Deskripsi'>{store?.description ?? '-'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const ListProducts = ({ data }) => {

    const columns = [
        {
            title: 'Nama Produk',
            dataIndex: 'name'
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            render: (_) => _ ? toRupiah(_):toRupiah(0)
        },
        {
            title: 'Nama Mitra',
            dataIndex: 'merchant'
        },
        {
            title: 'Produk Kategori',
            dataIndex: 'category'
        },
        {
            title: 'Produk Kategori Grup',
            dataIndex: 'group'
        },
        {
            title: 'Produk Kategori Tipe',
            dataIndex: 'type'
        }
    ]

    return (
        <Table
            scroll={{ y: 300 }}
            size='small'
            expandable={false}
            dataSource={data}
            columns={columns}
        />
    )
}

const StoreReviews = ({ data }) => {

    const columns = [
        {
            title: 'Nama Pelanggan',
            dataIndex: 'customer'
        },
        {
            title: 'Ulasan',
            dataIndex: 'review'
        },
        {
            title: 'Total Disukai',
            dataIndex: 'merchant'
        },
        {
            title: 'Rating',
            dataIndex: 'rating'
        }
    ]

    return (
        <Table
            scroll={{ y: 300 }}
            size='small'
            expandable={false}
            dataSource={data}
            columns={columns}
        />
    )
}