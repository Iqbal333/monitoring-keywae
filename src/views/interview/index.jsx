import { deleteInterview, getInterviews } from '@/api/interview'
import Prompt from '@/components/Modal'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Pagination, Space, Table } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddModal from './components/AddModal'
import EditModal from './components/EditModal'
import dayjs from 'dayjs'

export class Interviews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            query: {
                limit: 10,
                page: 0
            },
            filter: {
                search: ""
            },
            loading: false,
            addModalLoading: false,
            showPrompt: false,
            editModalOpen: false,
            deleteModalOpen: false,
            addModalOpen: false,
            interviewsId: null,
            editData: [],
            promptTitle: "",
            promptDescription: "",
            onAccept: () => {}
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({ loading: true })
        getInterviews(this.state.query, this.state.filter).then(res => {
            if (res.data.success) {
                const data = res.data.results
                this.setState({
                    data,
                    loading: false
                })
            } else {
                this.setState({
                    loading: false,
                    showPrompt: true
                },() => {
                    this.initialPrompt("Error",res.data.message)
                })
            }
        }).catch(err => {
            this.setState({
                loading: false,
                showPrompt: true
            },() => {
                this.initialPrompt("Error",err.message)
            })
        })
    }

    initialPrompt = (title, description) => {
        this.setState({
            promptTitle: title,
            promptDescription: description
        })
    }

    closeModal = () => {
        this.setState({
            editModalOpen: false,
            deleteModalOpen: false,
            addModalOpen: false
        })
    }

    changeLimit = (current, limit) => {
        this.setState(
            (state) => ({
                query: {
                    ...state.query,
                    page: 0,
                    limit,
                },
            }),
            () => {
                this.fetchData();
            }
        );
    };

    changePage = (page) => {
        this.setState(
            (state) => ({
                query: {
                    ...state.query,
                    page: page - 1,
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
                title: 'Schedule Date',
                dataIndex: 'scheduleDate',
                key: 'scheduleDate'
            },
            {
                title: 'Start Time',
                dataIndex: 'startTime',
                key: 'startTime'
            },
            {
                title: 'End Time',
                dataIndex: 'endTime',
                key: 'endTime'
            },
            {
                title: 'Quota',
                dataIndex: 'quota',
                key: 'quota'
            },
            {
                title: 'Action',
                dataIndex: 'interviewsId',
                key: 'interviewsId',
                render: (_, record) => (
                    <Space wrap>
                        <Link to={`/driver/interviews/details/${_}`}>
                            <Button size='small' icon={<EyeOutlined />}
                                type='default'>
                                Details
                            </Button>
                        </Link>
                        <Button size='small' icon={<EditOutlined />} onClick={() => {
                            let newRecord = record
                            let startTime    = dayjs('04-04-2023 '+(newRecord.startTime ?? '00:00'))
                            let endTime      = dayjs('04-04-2023 '+(newRecord.endTime ?? '00:00'))
                            let scheduleDate = dayjs(newRecord.scheduleDate)
                            let quota        = newRecord.quota ?? 0
                            this.setState({
                                interviewsId: _,
                                editData: {
                                    ...newRecord,
                                    startTime,
                                    endTime,
                                    scheduleDate,
                                }
                            },() => {
                                this.setState({ 
                                    editModalOpen: true,
                                })
                            })
                        }}
                            type='primary'>
                            Edit
                        </Button>
                        <Button size='small' icon={<DeleteOutlined />} onClick={() => {
                            this.setState({
                                deleteModalOpen: true,
                                interviewsId: _,
                                promptTitle: "Delete Interview",
                                promptDescription: "Delete Interview '"+record.scheduleDate+"' ?",
                                onAccept: () => {
                                    deleteInterview(_).then(res => {
                                        this.fetchData()
                                        this.setState({
                                            deleteModalOpen: false
                                        })
                                    })
                                }
                            })
                        }}
                            type='primary'
                            style={{ backgroundColor: '#C0392B' }}>
                            Delete
                        </Button>
                    </Space>
                )
            }
        ];

        return (
            <div className="app-container">
                <Prompt open={this.state.deleteModalOpen} title={this.state.promptTitle} description={this.state.promptDescription} onAccept={this.state.onAccept} onCancel={this.closeModal} />
                <AddModal
                    open={this.state.addModalOpen}
                    confirmLoading={this.state.addModalLoading}
                    onCancel={this.closeModal}
                    refresh={() => {
                        this.fetchData()
                        this.closeModal()
                    }}
                />
                <EditModal
                    open={this.state.editModalOpen}
                    interviewsId={this.state.interviewsId}
                    confirmLoading={this.state.editModalOpen}
                    onCancel={this.closeModal}
                    initialValues={this.state.editData}
                    refresh={() => {
                        this.fetchData()
                        this.closeModal()
                    }}
                />
                <Card title="Interview Schedule" extra={
                    <Button icon={<PlusOutlined />} onClick={() => {
                        this.setState({
                            addModalOpen: true
                        })
                    }}
                        type='default'>
                        Add Interview
                    </Button>
                }>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        rowKey={(record) => record.interviewsId}
                        pagination={false}
                        loading={this.state.loading}
                    />
                    <Pagination
                        size='small'
                        total={this.state.total}
                        pageSizeOptions={['10', '20', '50', '100']}
                        defaultPageSize={this.state.query.limit}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                        }
                        onChange={this.changePage}
                        current={this.state.query.page + 1}
                        onShowSizeChange={this.changeLimit}
                        pageSize={this.state.query.limit}
                        showSizeChanger
                        showQuickJumper
                    />
                </Card>
            </div>
        )
    }
}

export default Interviews