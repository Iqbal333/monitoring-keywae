import { getServiceType } from '@/api/master/globals'
import { getPromotionType } from '@/api/master/promotionType'
import { deletePromotion, getAllPromotions } from '@/api/promotions'
import { toRupiah } from '@/utils'
import { CheckSquareFilled, CloseSquareFilled, DeleteOutlined, EditFilled, FilterFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Collapse, DatePicker, Form, Input, Pagination, Select, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React, { Component } from 'react'
import EditForm from './components/EditForm'
import AddForm from './components/AddForm'
import DeleteForm from '@/components/Modal'

export class Promotions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            services: [],
            promotionTypes: [],
            loading: false,
            total: 0,
            listQuery: {
                page: 0,
                limit: 10,
            },
            filter: {
                search: '',
            },
            addModalOpen: false,
            editModalOpen: false,
            addModalLoading: false,
            editModalLoading: false,
            editData: [],
            deleteModalOpen: false,
            promotionId: '',
            fetchStatus: false,
            dateNow: null
        }
    }

    componentDidMount() {
        this.fetchData()
        this.fetchDataFilter()
    }

    fetchData = () => {
        this.setState({ loading: true })
        getAllPromotions(this.state.listQuery, this.state.filter)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data?.success) {
                    this.setState({
                        list: res.data.results
                    })
                }
            })
            .catch((err) => {
                this.setState({ loading: false })
                console.error(err)
            })
    }

    fetchDataFilter = () => {
        getServiceType()
            .then((res) => {
                if (res.data?.success) {
                    this.setState({
                        services: res.data.results
                    })
                }
            })

        getPromotionType()
            .then((res) => {
                if (res.data?.success) {
                    this.setState({
                        promotionTypes: res.data.results
                    })
                }
            })
    }

    filterDate = (value) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                startDate: value[0].format('YYYY-MM-DD'),
                endDate: value[1].format('YYYY-MM-DD')
            },
        }));
    };

    filterService = (value) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                serviceTypeId: value,
            },
        }));
    };

    filterPromotionType = (value) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                promotionTypeId: value,
            },
        }));
    };

    filterPromotion = (value) => {
        this.setState((state) => ({
            filter: {
                ...state.filter,
                promotionTypeId: value,
            },
        }));
    };

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

    closeModal = () => {
        this.setState({
            addModalOpen: false,
            editModalOpen: false,
            deleteModalOpen: false
        })
    }

    render() {
        const columns = [
            {
                title: 'Promotion Type',
                dataIndex: 'promotionType',
                key: 'promotionType'
            },
            {
                title: 'Service Type',
                dataIndex: 'serviceType',
                key: 'serviceType'
            },
            {
                title: 'Voucher Code',
                dataIndex: 'voucherCode',
                key: 'voucherCode'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate'
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                key: 'endDate'
            },
            {
                title: 'Rate',
                dataIndex: 'rate',
                key: 'rate',
                render: (_, record) => (
                    <>
                        {toRupiah(_ ?? 0)}
                    </>
                )
            },
            {
                title: 'Max Rate',
                dataIndex: 'maxRate',
                key: 'maxRate',
                render: (_, record) => (
                    <>
                        {toRupiah(_ ?? 0)}
                    </>
                )
            },
            {
                title: 'Nominal Type',
                dataIndex: 'isNominal',
                key: 'isNominal',
                align: 'center',
                render: (_, record) => (
                    <>
                        {_ ? (
                            <CheckSquareFilled color='#115E32' size={25} />
                        ) : (
                            <CloseSquareFilled color='#ED2C2D' size={25} />
                        )}
                    </>
                )
            },
            {
                title: 'Published',
                dataIndex: 'isPublish',
                key: 'isPublish',
                align: 'center',
                render: (_, record) => (
                    <>
                        {_ ? (
                            <CheckSquareFilled color='#115E32' size={25} />
                        ) : (
                            <CloseSquareFilled color='#ED2C2D' size={25} />
                        )}
                    </>
                )
            },
            {
                title: 'Action',
                key: 'action',
                dataIndex: 'promotionId',
                align: 'center',
                render: (_, data) => (
                    <Space wrap direction='horizontal'>
                        <Button title='Detail' type="primary" size='small' icon={<EditFilled />} onClick={() => {
                            this.setState({
                                promotionId: _,
                                editModalOpen: true
                            })
                        }}> 
                            Edit
                        </Button>
                        <Button title='Detail' type="primary" size='small' icon={<DeleteOutlined />} danger onClick={() => {
                            this.setState({
                                promotionId: _,
                                deleteModalOpen: true
                            })
                        }}> 
                            Delete
                        </Button>
                    </Space>
                ),
            },
        ]
        return (
            <div className='app-container'>
                <Collapse defaultActiveKey={['1']} style={{ marginBottom: 10 }}>
                    <Card>
                        <Form layout='inline'>
                            <Form.Item label='Service Type :'>
                                <Select
                                    style={{ width: 150 }}
                                    value={this.state.filter?.serviceTypeId ?? ''}
                                    onChange={this.filterService}
                                    options={this.state.services}
                                    fieldNames={{
                                        label: 'serviceTypeName',
                                        value: 'serviceTypeId'
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label='Promotion Type :'>
                                <Select
                                    style={{ width: 150 }}
                                    value={this.state.filter?.promotionTypeId ?? ''}
                                    onChange={this.filterPromotionType}
                                    options={this.state.promotionTypes}
                                    fieldNames={{
                                        label: 'promotionTypeName',
                                        value: 'promotionTypeId'
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label='Status :'>
                                <DatePicker.RangePicker
                                    allowClear={false}
                                    value={[dayjs(this.state.filter?.startDate ?? dayjs().format('YYYY/MM/DD'), 'YYYY/MM/DD'), dayjs(this.state.filter?.endDate ?? dayjs().format('YYYY/MM/DD'), 'YYYY/MM/DD')]}
                                    onChange={this.filterDate}
                                />
                            </Form.Item>
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
                <Card extra={<Button onClick={() => this.setState({ addModalOpen: true })}><PlusOutlined /> Add Promotion</Button>}>
                    <Table
                        size='small'
                        dataSource={this.state.list}
                        rowKey={(record) => record.promotionId}
                        bodyStyle={{ overflowX: 'auto' }}
                        columns={columns}
                        loading={this.state.loading}
                        pagination={false}
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
                    <AddForm
                        open={this.state.addModalOpen}
                        onCancel={this.closeModal}
                        confirmLoading={this.state.addModalLoading}
                        refresh={() => {
                            this.fetchData()
                            this.closeModal()
                        }}
                    />
                    <EditForm
                        open={this.state.editModalOpen}
                        onCancel={this.closeModal}
                        confirmLoading={this.state.editModalLoading}
                        refresh={() => {
                            this.fetchData()
                            this.closeModal()
                        }}
                        promotionId={this.state.promotionId}
                    />
                    <DeleteForm
                        open={this.state.deleteModalOpen}
                        title={"Delete Promotion"}
                        onCancel={this.closeModal}
                        onAccept={() => {
                            deletePromotion(this.state.promotionId)
                                .then((res) => {
                                    if (res.data.success) {
                                        this.fetchData()
                                        this.closeModal()
                                    }
                                })
                        }}
                        description={"Hapus data?"}
                    />
                </Card>
            </div>
        )
    }
}

export default Promotions