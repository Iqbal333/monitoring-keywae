import { getInterviewDriver, getInterviewSchedule } from '@/api/interview'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Checkbox, Input, Pagination, Space, Table, message } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ListDriver({ interviewsId, defaultValue = [], onChange, value }) {

    const [driver, setDriver] = useState([])
    const [query, setQuery] = useState({ limit: 10, page: 0 })
    const [search, setSearch] = useState("")
    const [Message, contextHandler] = message.useMessage()

    useEffect(() => {
        getInterviewDriver(query).then(results => {
            setDriver(results.data.results)
        })

        return () => {
            return false
        }
    }, [query])

    useEffect(() => {
        if (interviewsId) {
            getInterviewSchedule(interviewsId).then(res => {
                if (res.data.success) {
                    let results = res.data.results?.map((val) => {
                        val.isEdit = true
                        return val
                    })
                    setDriver((val) => val.concat(results))
                } else {
                    Message.error({
                        content: res.data.message,
                        duration: 1000
                    })
                }
            }).catch(err => {
                Message.error({
                    content: err.message,
                    duration: 1000
                })
            })
        }

        return () => {
            return false
        }
    },[interviewsId])

    const handleQuery = () => {
        setDriver([])
        getInterviewDriver(query, { search: search }).then(results => {
            setDriver(results.data.results)
        })
        if (interviewsId) {
            getInterviewSchedule(interviewsId,query,{ search: search }).then(results => {
                let res = results.data.results?.map((val) => {
                    val.isEdit = true
                    return val
                })
                setDriver((val) => val.concat(res))
            })
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'driverId',
            key: 'driverId',
            render: (driverId, record) => (
                <RenderCheckbox currentValue={driverId} isEmail={record.isEmail} checked={value} onChecked={onChange} defaultValues={defaultValue} />
            )
        },
        {
            title: 'Photo',
            dataIndex: 'driverImageUrl',
            key: 'driverImageUrl',
            render: (_, record) => (
                <>
                    <Avatar src={_} width={35} shape="square" />
                </>
            )
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicleType',
            key: 'vehicleType'
        },
        {
            title: 'Register Date',
            dataIndex: 'registerDate',
            key: 'registerDate'
        }
    ];

    const SearchComponent = () => {
        return (
            <Space wrap>
                <Input onChange={(e) => setSearch(e.nativeEvent.target.values)} value={search} />
                <Button icon={<SearchOutlined />} type="primary" onClick={handleQuery}>
                    Search
                </Button>
            </Space>
        )
    }

    const changePage = (page) => {
        setQuery((val) => {
            return { ...val, page: page - 1 }
        })
    };

    const changeLimit = (current, limit) => {
        setQuery((val) => {
            return { ...val, limit }
        })
    };

    return (
        <Card title='LIST DRIVER' extra={<SearchComponent />}>
            {contextHandler}
            <Table
                rowKey={(_) => _.driverId}
                bordered={true}
                dataSource={driver}
                columns={columns}
                pagination={false}
            />
            <Pagination
                size='small'
                total={driver.length}
                pageSizeOptions={['10', '20', '50', '100']}
                defaultPageSize={query.limit}
                showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                }
                onChange={changePage}
                current={query.page + 1}
                onShowSizeChange={changeLimit}
                pageSize={query.limit}
                showSizeChanger
                showQuickJumper
            />
        </Card>
    )
}

const RenderCheckbox = ({ currentValue = "", isEmail = false, defaultValues = [], onChecked = () => {}, checked = [] }) => {
    
    const check         = defaultValues.length > 0 ? defaultValues.find((val) => val.driverId === currentValue):false
    const propsCheckbox = (check && isEmail === true) ? { defaultChecked: true, disabled: true }: (check && isEmail === false) ? { defaultChecked: true }:{  }

    return (
        <Checkbox key={currentValue} {...propsCheckbox} onClick={(e) => {
            if (e.target.checked) {
                onChecked?.([...checked, { driverId: currentValue }]);
            } else {
                let newData = checked?.filter((val) => { return val.driverId !== currentValue })
                onChecked?.([...newData])
            }
        }}/>
    )
}