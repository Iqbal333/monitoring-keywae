import { incomes, listIncomes } from '@/api/transactions';
import { toRupiah } from '@/utils';
import LineChart from '@/views/dashboard/components/LineChart';
import { Card, DatePicker, Input, Pagination, Select, Table } from 'antd'
import dayjs from 'dayjs';
import React, { Component } from 'react'

export class TransactionIncome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            loading: false,
            total: 0,
            listQuery: {
                limit: 10,
                page: 0
            },
            filter: {
                search: ''
            },
            listChartLegend: ['Keywae','MaxTech','Driver','Order'],
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
                    name: 'MaxTech',
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
            listChartOrderLegend: ['Total Order']
        }
    }

    componentDidMount() {
        this.fetchDataIncome()
    }

    fetchDataIncome() {
        this.setState({ loading: true })
        incomes(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    const list  = res.data.results
                    const total = res.data.meta.total
                    
                    let chart = {
                        keywae: [],
                        maxTech: [],
                        driver: [],
                        order: []
                    }
                    
                    let axis = []

                    if (list?.length > 0) {
                        list.map((val, idx) => {
                            axis[(list.length - 1) - idx] = val.orderDate ? dayjs(val.orderDate).format('DD MMMM YYYY'):''
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
        this.setState((state) => ({
            filter: {
                ...state.filter,
                startDate: date[0] ?? dayjs().format('YYYY-MM-DD'),
                endDate: date[1] ?? dayjs().format('YYYY-MM-DD')
            }
        }))
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
                search: ''
            }
        }))
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

    render() {

        const columns = [
            {
                title: 'Order Date',
                key: 'orderDate',
                dataIndex: 'orderDate',
                render: (_,record) => (
                    <>{dayjs(_,'YYYY-MM-DD').format('DD MMMM YYYY')}</>
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
            <div className="app-container">
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
            </div>
        )
    }
}

export default TransactionIncome