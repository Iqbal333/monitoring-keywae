import { getReviews } from '@/api/reviews'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Input, Pagination, Table } from 'antd'
import React, { Component } from 'react'
import noImage from '@/assets/images/no-image.png'

export class Reviews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            loading: false,
            total: 0,
            listQuery: {
                page: 0,
                limit: 10,
            },
            filter: {
                search: '',
            },
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        this.setState({ loading: true })
        getReviews(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    this.setState({
                        list: res.data.results
                    })
                }
            })
    }

    filterSearch = (e) => {
        let value = e.target.value;
        this.setState((state) => ({
            listQuery: {
                page: 0,
                limit: state.listQuery.limit ?? 2,
            },
            filter: {
                ...state.filter,
                search: value,
            },
        }));
    };

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
                    search: ''
                },
            }),
            () => {
                this.fetchData();
            }
        );
    };

    render() {

        const columns = [
            {
                title: '#',
                key: 'driverImageUrl',
                dataIndex: 'driverImageUrl',
                render: (_, record) => (
                    <Avatar src={_ ? _ : noImage} width={50} shape="square" />
                )
            },
            {
                title: 'Driver Name',
                key: 'driverName',
                dataIndex: 'driverName'
            },
            {
                title: 'Service Type',
                key: 'serviceType',
                dataIndex: 'serviceType'
            },
            {
                title: 'Rating',
                key: 'rating',
                dataIndex: 'rating'
            },
            {
                title: 'Trips',
                key: 'trips',
                dataIndex: 'trips'
            },
            {
                title: 'Total Review',
                key: 'totalReview',
                dataIndex: 'totalReview'
            }
        ]

        return (
            <div className='app-container'>
                <Card title='Reviews'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Input onChange={this.filterSearch} style={{ flex: 0, minWidth: 200 }}/>
                        <Button type='primary' icon={<SearchOutlined />} style={{ marginLeft: 5 }} onClick={this.fetchData}>
                            Search
                        </Button>
                    </div>
                </Card>
                <Card style={{ marginTop: 10, marginBottom: 10 }} >
                    <Table
                        size='small'
                        dataSource={this.state.list}
                        rowKey={(record) => Math.random() * record.length}
                        bodyStyle={{ overflowX: 'auto' }}
                        columns={columns}
                        loading={this.state.loading}
                        pagination={false}
                        style={{ minHeight: 300 }}
                    />
                    <br />
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

export default Reviews