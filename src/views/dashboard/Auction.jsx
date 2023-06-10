import { getDashboard, getDashboardLastBid } from '@/api/auction/dashboard'
import { Icon } from '@/components/Icon'
import { Card, Col, Row, Table } from 'antd'
import React, { Component } from 'react'
import CountUp from 'react-countup'
import './index.less'
import dayjs from 'dayjs'

export default class AuctionDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            cardList: [
                {
                    type: 'Pendapatan',
                    key: 'income',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#40c9c6'
                },
                {
                    type: 'Produk Lelang',
                    key: 'auction-product',
                    num: 0,
                    icon: 'DatabaseOutlined',
                    color: '#40c9c6'
                },
                {
                    type: 'Partner',
                    key: 'partner',
                    num: 0,
                    icon: 'UserOutlined',
                    color: '#40c9c6'
                }
            ],
            lastBid: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({ loading: true })
        getDashboard().then(results => {
            if (results.data.success) {
                this.setState((state) => ({
                    cardList: [
                        {
                            ...state.cardList[0],
                            num: results.data?.results.totalBidding
                        },
                        {
                            ...state.cardList[1],
                            num: results.data?.results?.totalAuctionItem
                        },
                        {
                            ...state.cardList[2],
                            num: results.data?.results?.totalParticipant
                        }
                    ]
                }))
            }
        }).catch((err) => {
            console.error(err)
        })

        getDashboardLastBid().then((results) => {
            if (results.data.success) {
                this.setState({
                    lastBid: results.data?.results
                })
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    render() {

        const columns = [
            {
                title: 'Nama Penwar',
                dataIndex: 'partnerName'
            },
            {
                title: 'Nomor Lelang',
                dataIndex: 'nplNo'
            },
            {
                title: 'Nama Barang',
                dataIndex: 'auctionName'
            },
            {
                title: 'Nomor Barang',
                dataIndex: 'auctionNo'
            },
            {
                title: 'Tanggal Penawaran',
                dataIndex: 'offeringDate',
                render: (_) => _ ? dayjs(_).format('DD MMMM YYYY'):'-'
            }
        ]

        return (
            <>
                <div className='panel-group-container'>
                    <Row gutter={40} className='panel-group'>
                        {this.state.cardList.map((val, idx) => (
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
                                        <CountUp end={val.num} start={0} className='card-panel-num' />
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <Card title='Daftar Transaksi Terkini'>
                    <Table
                        dataSource={this.state.lastBid}
                        rowKey={() => Math.random() * 100}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </>
        )
    }
}
