import { Avatar, Button, Card, Collapse, Form, Image, Input, Pagination, Table } from 'antd'
import React, { Component } from 'react'
import noImage from '@/assets/images/no-image.png';
import { EyeFilled, FilterFilled, SearchOutlined } from '@ant-design/icons';
import { getSellers } from '@/api/shops/partner';
import { Link } from 'react-router-dom';

export default class index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            total: 0,
            listData: [],
            listQuery: {
                page: 0,
                limit: 10
            },
            filter: {
                search: ''
            }
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({ loading: true })
        getSellers(this.state.listQuery, this.state.filter)
        .then((results) => {
            this.setState({ loading: false })
            if (results.data.success) {
                    let total = results.data?.meta?.total
                    this.setState({
                        listData: results.data.results,
                        total
                    })
                }
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
                this.fetchData();
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
                this.fetchData();
            }
        );
    };

    resetFilter = () => {
        this.setState(
            (state) => ({
                listQuery: {
                    page: 0,
                    limit: 10,
                },
                filter: {
                    search: '',
                    isApprove: true,
                },
            }),
            () => {
                this.fetchData();
            }
        );
    };

    filterSearch = (e) => {
        let value = e.target.value;
        this.setState((state) => ({
            listQuery: {
                page: 0,
                limit: state.listQuery.limit ?? 10,
            },
            filter: {
                ...state.filter,
                search: value,
            },
        }));
    };

    render() {

        const columns = [
            {
                title: '#',
                dataIndex: 'image',
                key: 'image',
                render: (_) => <Avatar shape='square' src={_ ? _ : noImage} size={35}/>
            },
            {
                title: 'Nama Toko',
                dataIndex: 'store_name',
                key: 'store_name'
            },
            {
                title: 'Slogan',
                dataIndex: 'slogan',
                key: 'slogan'
            },
            {
                title: 'Total Produk',
                dataIndex: 'totalproduk',
                key: 'totalproduk'
            },
            {
                title: 'Total Transaksi',
                dataIndex: 'totaltransaksi',
                key: 'totaltransaksi'
            },
            {
                title: 'Aksi',
                dataIndex: 'store_id',
                key: 'aksi',
                render: (_, record) => (
                    <Link to={'/shop/seller-detail/'+_}>
                        <Button size='small' icon={<EyeFilled />} type='default'>
                            Details
                        </Button>
                    </Link>
                )
            }
        ]

        return (
            <div className="app-container">
                <Collapse defaultActiveKey={['1']}>
                    <Card>
                        <Form layout='inline'>
                            <Form.Item name='name' label='Search :'>
                                <Input
                                    style={{ width: 250 }}
                                    value={this.state.filter?.search ?? ''}
                                    onChange={this.filterSearch}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    icon={<SearchOutlined />}
                                    onClick={this.fetchData}
                                >
                                    Search
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='default'
                                    icon={<FilterFilled />}
                                    onClick={this.resetFilter}
                                >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Collapse>
                <br/>
                <Card title='LIST SELLER'>
                    <Table
                        size='small'
                        dataSource={this.state.listData}
                        rowKey={(record) => record.store_id}
                        columns={columns}
                        loading={this.state.loading}
                        pagination={false}
                    />
                    <Pagination
                        size='small'
                        total={this.state.total}
                        pageSizeOptions={['10', '20', '50', '100']}
                        defaultPageSize={this.state.listQuery.limit}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                        }
                        onChange={this.changePage}
                        current={this.state.listQuery.page + 1}
                        onShowSizeChange={this.changeLimit}
                        pageSize={this.state.listQuery.limit}
                        showSizeChanger
                        showQuickJumper
                    />
                </Card>
            </div>
        )
    }
}
