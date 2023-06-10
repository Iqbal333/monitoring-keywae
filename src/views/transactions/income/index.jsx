import { getPaymentMethod } from '@/api/master/paymentMethod';
import { getServiceType } from '@/api/master/serviceType';
import { listIncomes } from '@/api/transactions';
import { toRupiah } from '@/utils';
import { EyeFilled, FilterFilled } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Pagination, Select, Space, Table } from 'antd'
import dayjs from 'dayjs';
import React, { Component } from 'react'
import { createRef } from 'react';
import { Link } from 'react-router-dom';

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
            serviceTypes: [],
            paymentMethods: []
        }

        this.searchInput = createRef()
        this.paymentMethod = createRef()
        this.datePicker = createRef()
        this.serviceType = createRef()
    }

    componentDidMount() {
        this.fetchDataIncome()
    }

    fetchDataIncome() {
        this.setState({ loading: true })

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

        listIncomes(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    const list  = res.data.results
                    const total = res.data.meta.total
                    
                    this.setState((state) => ({
                        list,
                        total,
                        listQuery: {
                            ...state.listQuery,
                            page: res.data.meta.page,
                        }
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
                orderDate: date.format('DD-MM-YYYY')
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
        this.setState({
            listQuery: {
                limit: 10,
                page: 0
            },
            filter: {
                search: '',
                orderDate: dayjs().format('DD-MM-YYYY')
            }
        },() => {
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
                title: 'Transaction Status',
                key: 'transactionStatus',
                dataIndex: 'transactionStatus'
            },
            {
                title: 'Payment Method',
                key: 'paymentMethod',
                dataIndex: 'paymentMethod'
            },
            {
                title: 'Driver Name',
                key: 'driverName',
                dataIndex: 'driverName'
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
            {
                title: 'Action',
                key: 'action',
                dataIndex: 'orderId',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <Link to={`/transaction/income/details/${_}`}>
                            <Button type='default' size='small' icon={<EyeFilled />}>
                                Details
                            </Button>
                        </Link>
                    </Space>
                )
            }
        ]

        return (
            <div className="app-container">
                <Card title="LIST INCOME">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                            <span style={{ marginBottom: 3 }}>Date :</span>
                            <DatePicker allowClear={false} onChange={this.filterDate} />
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
                            }} icon={<FilterFilled />}  type="primary">
                                Filter Data
                            </Button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'end', marginLeft: 5, marginRight: 5 }}>
                            <Button onClick={this.filterReset} icon={<FilterFilled />}  type="default">
                                Reset Filter
                            </Button>
                        </div>
                    </div>
                </Card>
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