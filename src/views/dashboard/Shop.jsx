import { transactionDashboard } from '@/api/shops/transaction'
import { Icon } from '@/components/Icon'
import { toRupiah } from '@/utils'
import { Card, Col, Row, Table, Tag } from 'antd'
import React, { Component } from 'react'
import CountUp from 'react-countup'

export default class ShopDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            cardList: [
                {
                    type: 'Total Transaksi',
                    key: 'total',
                    num: toRupiah(0),
                    icon: 'WalletOutlined',
                    color: '#40c9c6',
                },
                {
                    type: 'Potongan Pajak',
                    key: 'tax',
                    num: toRupiah(0),
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Transaksi Tertunda',
                    key: 'pending',
                    num: toRupiah(0),
                    icon: 'ShoppingCartOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Potongan Bitship',
                    key: 'shipment',
                    num: toRupiah(0),
                    icon: 'ShoppingCartOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Pendapatan',
                    key: 'income',
                    num: toRupiah(0),
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Payment Gateway',
                    key: 'pg',
                    num: toRupiah(0),
                    icon: 'ShoppingCartOutlined',
                    color: '#36a3f7',
                },
            ],
            lastTransaction: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({ loading: true })
        transactionDashboard().then((results) => {
            if (results.data?.success) {
                this.setState((state) => (
                    {
                        ...state,
                        cardList: [
                            {
                                ...state.cardList[0],
                                num: results.data.results?.totalTransaction?.totalTransaction
                            },
                            {
                                ...state.cardList[1],
                                num: results.data.results?.taxCut?.totalTaxCut
                            },
                            {
                                ...state.cardList[2],
                                num: 0
                            },
                            {
                                ...state.cardList[3],
                                num: results.data.results?.shipmentCut?.totalCut
                            },
                            {
                                ...state.cardList[4],
                                num: results.data.results?.income
                            },
                            {
                                ...state.cardList[5],
                                num: results.data.results?.paymentCut?.totalPaymentCut
                            }
                        ],
                        lastTransaction: results.data?.results?.lastTransaction ?? []
                    }
                ))
            }
        })
    }

  render() {

    const columns = [
        {
            dataIndex: 'customerName',
            title: 'Nama Pelanggan',
            key: 'cn',
        },
        {
            dataIndex: 'orderNumber',
            title: 'Nomor Pesanan',
            key: 'orderNumber'
        },
        {
            dataIndex: 'invoiceNumber',
            title: 'Nomor Invoice',
            key: 'invoice'
        },
        {
            dataIndex: 'paymentStatus',
            title: 'Status',
            key: 'status',
            render: (_) => <Tag color={_.toLowerCase() === 'paid' ? 'green':'yellow'} >{_}</Tag>
        },
        {
            dataIndex: 'orderTotal',
            title: 'Total Keseluruhan',
            key: 'orderTotal',
            render: (_) => toRupiah(_ ?? 0)
        },
        {
            dataIndex: 'totalPuchase',
            title: 'Total yang dibayar',
            key: 'purchases',
            render: (_) => toRupiah(_ ?? 0)
        },
        {
            dataIndex: 'shippingCost',
            title: 'Biaya Pengiriman',
            key: 'shipping',
            render: (_) => toRupiah(_ ?? 0)
        }
    ]

    return (
        <>
            <div className='panel-group-container'>
                <Row gutter={40} className='panel-group'>
                    {this.state.cardList.map((val) => (
                        <Col
                            key={val.key}
                            lg={6}
                            sm={12}
                            xs={12}
                            className='card-panel-col'
                        >
                            <div className='card-panel'>
                                <div className='card-panel-icon-wrapper'>
                                    <Icon
                                        className='card-panel-icon'
                                        style={{ color: val.color }}
                                        icon={val?.icon}
                                    />
                                </div>
                                <div className='card-panel-description'>
                                    <p className='card-panel-text'>{val.type}</p>
                                    <CountUp end={val?.num} start={0} className='card-panel-num' onEnd={arg => console.log(arg)}/>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <Card title='Daftar Transaksi Terkini'>
                <Table
                    dataSource={this.state.lastTransaction}
                    rowKey={(record) => record.orderId}
                    columns={columns}
                    pagination={false}
                />
            </Card>
        </>       
    )
  }
}
