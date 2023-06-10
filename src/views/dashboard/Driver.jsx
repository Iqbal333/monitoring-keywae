import { incomes, listIncomes } from '@/api/transactions';
import { toRupiah } from '@/utils';
import LineChart from '@/views/dashboard/components/LineChart';
import { Button, Card, Col, DatePicker, Input, Pagination, Row, Select, Table } from 'antd'
import dayjs from 'dayjs';
import React, { Component } from 'react'
import './index.less'
import './components/PanelGroup/index.less'
import { Icon } from '@/components/Icon';
import CountUp from 'react-countup';
import { createRef } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { getPaymentMethod } from '@/api/master/paymentMethod';
import { getServiceType } from '@/api/master/serviceType';

export class DriverDashboard extends Component {

    constructor(props) {
        super(props)

        this.chartList = createRef()
        this.chartOrder = createRef()
        this.state = {
            list: [],
            loading: false,
            total: 0,
            listQuery: {
                limit: 10,
                page: 0
            },
            filter: {
                search: '',
                filter: '1w'
            },
            calendarDates: [],
            serviceTypes: [],
            paymentMethods: [],
            tempChartLegend: [],
            tempChart: [],
            listChartLegend: ['Keywae', 'Biaya Layanan', 'Driver', 'Order'],
            listChartAxis: [],
            listChart: [
                {
                    name: 'Keywae',
                    smooth: true,
                    type: 'line',
                    data: [0],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                },
                {
                    name: 'Biaya Layanan',
                    smooth: true,
                    type: 'line',
                    data: [0],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                },
                {
                    name: 'Driver',
                    smooth: true,
                    type: 'line',
                    data: [0],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                }
            ],
            listChartOrder: [
                {
                    name: 'Total Order',
                    smooth: true,
                    type: 'line',
                    data: [0],
                    animationDuration: 2800,
                    animationEasing: "cubicInOut",
                },
            ],
            listChartOrderAxis: [],
            listChartOrderLegend: ['Total Order'],
            cardList: [
                {
                    type: 'Total Pendapatan KeyShop',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#40c9c6',
                },
                {
                    type: 'Total Pendapatan KeyDriver',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Pendapatan KeyMerchant',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Pendapatan KeySeller',
                    num: 0,
                    icon: 'ShoppingCartOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Driver Motor',
                    num: 0,
                    icon: 'ShoppingCartOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Driver Motor',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#40c9c6',
                },
                {
                    type: 'Total Toko',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
                {
                    type: 'Total Resto',
                    num: 0,
                    icon: 'WalletOutlined',
                    color: '#36a3f7',
                },
            ]
        }
    }

    componentDidMount() {
        this.fetchDataIncome()
        
        getServiceType()
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        serviceTypes: res.data.results
                    })
                }
            })

        getPaymentMethod()
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        paymentMethods: res.data.results
                    })
                }
            })
    }

    fetchChartById = (id) => {
        if (
            this.state.tempChart.length === 0 &&
            this.state.tempChartLegend.length === 0 &&
            this.state.listChart.length > 0 &&
            this.state.listChartLegend.length > 0
        ) {
            this.setState((state) => ({
                tempChart: state.listChart,
                tempChartLegend: state.listChartLegend,
                listChart: [state.listChart[id]],
                listChartAxis: state.listChartAxis,
                listChartLegend: [state.listChartLegend[id]],
            }))
        } else {
            this.setState((state) => ({
                listChart: [state.tempChart[id]],
                listChartAxis: state.listChartAxis,
                listChartLegend: [state.tempChartLegend[id]],
            }))
        }
    }

    fetchDataIncome() {
        this.setState({ loading: true })
        incomes(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    const list = res.data.results
                    const total = res.data.meta.total

                    let chart = {
                        keywae: [],
                        maxTech: [],
                        driver: [],
                        order: []
                    }

                    let card = {
                        keywae: 0,
                        maxTech: 0,
                        driver: 0,
                        order: 0
                    }

                    let axis = []

                    if (list?.length > 0) {
                        list.map((val, idx) => {
                            axis[(list.length - 1) - idx] = val.orderDate ? dayjs(val.orderDate).format('DD MMMM YYYY') : ''

                            chart.keywae[(list.length - 1) - idx] = val.keywae ?? 0
                            chart.maxTech[(list.length - 1) - idx] = val.maxTech ?? 0
                            chart.driver[(list.length - 1) - idx] = val.driver ?? 0
                            chart.order[(list.length - 1) - idx] = val.totalOrder

                            card.keywae = card.keywae + (val.keywae ?? 0)
                            card.maxTech = card.maxTech + (val.maxTech ?? 0)
                            card.driver = card.driver + (val.driver ?? 0)
                            card.order = card.order + (val.totalOrder ?? 0)
                        })
                    }

                    this.setState((state) => ({
                        list,
                        total,
                        listQuery: {
                            ...state.listQuery,
                            page: res.data.meta.page,
                        },
                        listChart: [
                            {
                                ...state.listChart[0],
                                data: chart.keywae
                            },
                            {
                                ...state.listChart[1],
                                data: chart.maxTech
                            },
                            {
                                ...state.listChart[2],
                                data: chart.driver
                            },
                            {
                                ...state.listChart[3],
                                data: chart.order
                            },
                        ],
                        listChartAxis: axis,
                        listChartOrderAxis: axis,
                        listChartOrder: [
                            {
                                ...state.listChartOrder[0],
                                data: chart.order
                            }
                        ],
                        cardList: [
                            {
                                ...state.cardList[0],
                                num: card.keywae
                            },
                            {
                                ...state.cardList[1],
                                num: card.maxTech
                            },
                            {
                                ...state.cardList[2],
                                num: card.driver
                            },
                            {
                                ...state.cardList[3],
                                num: card.order
                            },
                            {
                                ...state.cardList[4],
                                num: card.order
                            },
                            {
                                ...state.cardList[5],
                                num: card.keywae
                            },
                            {
                                ...state.cardList[6],
                                num: card.maxTech
                            },
                            {
                                ...state.cardList[7],
                                num: card.driver
                            },
                        ]
                    }))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fetchDataIncomeList() {
        this.setState({ loading: true })
        incomes(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    const list = res.data.results
                    const total = res.data.meta.total

                    let chart = {
                        keywae: [],
                        maxTech: [],
                        driver: [],
                        order: []
                    }

                    let card = {
                        keywae: 0,
                        maxTech: 0,
                        driver: 0,
                        order: 0
                    }

                    let axis = []

                    if (list?.length > 0) {
                        list.map((val, idx) => {
                            axis[(list.length - 1) - idx] = val.orderDate ? dayjs(val.orderDate).format('DD MMMM YYYY') : ''

                            chart.keywae[(list.length - 1) - idx] = val.keywae ?? 0
                            chart.maxTech[(list.length - 1) - idx] = val.maxTech ?? 0
                            chart.driver[(list.length - 1) - idx] = val.driver ?? 0
                            chart.order[(list.length - 1) - idx] = val.totalOrder
                        })
                    }

                    this.setState((state) => ({
                        list,
                        total,
                        listQuery: {
                            ...state.listQuery,
                            page: res.data.meta.page,
                        },
                        listChart: [
                            {
                                ...state.listChart[0],
                                data: chart.keywae
                            },
                            {
                                ...state.listChart[1],
                                data: chart.maxTech
                            },
                            {
                                ...state.listChart[2],
                                data: chart.driver
                            },
                            {
                                ...state.listChart[3],
                                data: chart.order
                            }
                        ],
                        listChartAxis: axis,
                        listChartOrderAxis: axis,
                        listChartOrder: [
                            {
                                ...state.listChartOrder[0],
                                data: chart.order
                            }
                        ]
                    }))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    filterDate = (date) => {
        if (date) {
            this.setState((state) => ({
                filter: {
                    ...state.filter,
                    startDate: date[0].format('DD-MM-YYYY') ?? dayjs().format('DD-MM-YYYY'),
                    endDate: date[1].format('DD-MM-YYYY') ?? dayjs().format('DD-MM-YYYY')
                }
            }))
        } else {
            this.setState((state) => ({
                filter: {
                    search: '',
                    filter: '1w'
                }
            }), () => {
                this.fetchDataIncome()
            })
        }
    }

    filterPayment = (paymentMethodId) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                paymentMethodId
            }
        }))
    }

    filterService = (serviceTypeId) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                serviceTypeId
            }
        }))
    }

    filterSearch = (search) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                search: search.target.value
            }
        }))
    }

    filterReset = () => {
        this.setState((state) => ({
            listQuery: {
                limit: 10,
                page: 0
            },
            filter: {
                search: '',
                filter: '1w'
            }
        }),() => {
            this.fetchDataIncome()
        })
    }

    changePage = (page) => {
        this.setState(
            (state) => ({
                listQuery: {
                    ...state.listQuery,
                    page: page - 1,
                },
            }),
            () => {
                this.fetchDataIncome();
            }
        );
    };

    changeLimit = (current, limit) => {
        this.setState(
            (state) => ({
                listQuery: {
                    ...state.listQuery,
                    page: 0,
                    limit,
                },
            }),
            () => {
                this.fetchDataIncome();
            }
        );
    };

    changeListPage = (page) => {
        this.setState(
            (state) => ({
                list_query: {
                    ...state.list_query,
                    page: page - 1,
                },
            }),
            () => {
                this.fetchDataList();
            }
        );
    };

    disableDate = (current) => {
        if (!this.state.calendarDates) {
            return false;
        }
        const tooLate = this.state.calendarDates[0] && current.diff(this.state.calendarDates[0], 'days') >= 7;
        const tooEarly = this.state.calendarDates[1] && this.state.calendarDates[1].diff(current, 'days') >= 7;
        return !!tooEarly || !!tooLate;
    }

    render() {

        const columns = [
            {
                title: 'Order Date',
                key: 'orderDate',
                dataIndex: 'orderDate',
                render: (_, record) => (
                    <>{dayjs(_, 'YYYY-MM-DD').format('DD MMMM YYYY')}</>
                )
            },
            {
                title: 'Service Type',
                key: 'serviceType',
                dataIndex: 'serviceType'
            },
            {
                title: 'Payment Method',
                key: 'paymentMethod',
                dataIndex: 'paymentMethod'
            },
            {
                title: 'Total Order',
                key: 'totalOrder',
                dataIndex: 'totalOrder'
            },
            {
                title: 'Max Tech',
                key: 'maxTech',
                dataIndex: 'maxTech',
                render: (_, record) => (
                    <>{toRupiah(_ ?? 0)}</>
                )
            },
            {
                title: 'Keywae',
                key: 'keywae',
                dataIndex: 'keywae',
                render: (_, record) => (
                    <>{toRupiah(_ ?? 0)}</>
                )
            },
            {
                title: 'Driver',
                key: 'driver',
                dataIndex: 'driver',
                render: (_, record) => (
                    <>{toRupiah(_ ?? 0)}</>
                )
            },
        ]

        return (
            <>
                <div className='panel-group-container'>
                    <Row gutter={40} className='panel-group'>
                        {this.state.cardList.map((val, idx) => (
                            <Col
                                key={idx}
                                lg={6}
                                sm={12}
                                xs={12}
                                className='card-panel-col'
                                onClick={() => {
                                    this.fetchChartById(idx)
                                }}
                            >
                                <div className='card-panel'>
                                    <div className='card-panel-icon-wrapper'>
                                        <Icon
                                            className={`${val?.type} card-panel-icon`}
                                            style={{ color: val.color }}
                                            icon={val?.icon}
                                        />
                                    </div>
                                    <div className='card-panel-description'>
                                        <p className='card-panel-text'>{val.type}</p>
                                        <CountUp end={val?.num} start={0} className='card-panel-num'/>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <Card title="Filter INCOME">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <span style={{ marginBottom: 3 }}>Date :</span>
                                <DatePicker.RangePicker allowClear={true} onChange={this.filterDate} disabledDate={this.disableDate} onCalendarChange={(val) => this.setState({ calendarDates: val })} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <span style={{ marginBottom: 3 }}>Service Type :</span>
                                <Select fieldNames={{ label: 'serviceTypeName', value: 'serviceTypeId' }} options={this.state.serviceTypes} onChange={this.filterService} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <span style={{ marginBottom: 3 }}>Payment Method :</span>
                                <Select fieldNames={{ label: 'paymentMethodName', value: 'paymentMethodId' }} options={this.state.paymentMethods} onChange={this.filterPayment} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <span style={{ marginBottom: 3 }}>Search :</span>
                                <Input onChange={this.filterSearch} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <Button onClick={() => {
                                    this.fetchDataIncome()
                                }} icon={<FilterFilled />} type="primary">
                                    Filter Data
                                </Button>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                                <Button onClick={this.filterReset} icon={<FilterFilled />} type="default">
                                    Reset Filter
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Card style={{ flex: 1 }} title="PROFIT SHARING">
                        <LineChart
                            chartData={{
                                series: this.state.listChart,
                                xAxis: this.state.listChartAxis,
                                legend: this.state.listChartLegend
                            }}
                            styles={{
                                padding: 12,
                                backgroundColor: '#fff',
                                marginBottom: '25px',
                            }}
                        />
                    </Card>
                    <div style={{ marginLeft: 5, marginRight: 5 }} />
                    <Card style={{ flex: 1 }} title="TOTAL ORDER">
                        <LineChart
                            chartData={{
                                series: this.state.listChartOrder,
                                xAxis: this.state.listChartOrderAxis,
                                legend: this.state.listChartOrderLegend
                            }}
                            styles={{
                                padding: 12,
                                backgroundColor: '#fff',
                                marginBottom: '25px',
                            }}
                        />
                    </Card>
                </div>
                <Card
                    title="INCOME"
                    style={{ marginTop: 10, marginBottom: 10 }}
                >
                    <Table
                        size='small'
                        dataSource={this.state.list}
                        rowKey={() => Math.random() * 1000}
                        columns={columns}
                        loading={this.state.loading}
                        pagination={false}
                        style={{ minHeight: 300 }}
                    />
                    <Pagination
                        size='small'
                        total={this.state.total}
                        pageSizeOptions={['10', '20', '50', '100']}
                        defaultPageSize={this.state.listQuery.limit}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        onChange={this.changePage}
                        current={this.state.listQuery.page + 1}
                        onShowSizeChange={this.changeLimit}
                        pageSize={this.state.listQuery.limit}
                        style={{ marginTop: 10 }}
                        showSizeChanger
                        showQuickJumper
                    />
                </Card>
            </>
        )
    }
}

export default DriverDashboard