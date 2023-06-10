import { getInterviewSchedule } from '@/api/interview'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Checkbox, Input, Pagination, Space, Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import noImage from '@/assets/images/no-image.png'

export default function ListDriver({ interviewsId }) {

    const [driver, setDriver] = useState([])
    const [query, setQuery] = useState({ limit: 10, page: 0 })
    const [search, setSearch] = useState("")

    useEffect(() => {
        getInterviewSchedule(interviewsId, query).then(results => {
            setDriver(results.data.results)
        })

        return () => {
            return false
        }
    }, [query])

    const handleQuery = () => {
        setDriver([])
        getInterviewSchedule(interviewsId, query, { search: search }).then(results => {
            setDriver(results.data.results)
        })
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'driverImageUrl',
            key: 'driverImageUrl',
            render: (_, record) => (
                <>
                    <Avatar src={_ ? _:noImage} size={35} shape="square" />
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
        <Card title='LIST DRIVER' size="default" extra={<SearchComponent />}>
            <Table
                size="small"
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

const RenderCheckbox = ({ currentValue = "", defaultValues = [], onChecked = () => {}, checked = [] }) => {
    if (defaultValues.length > 0) {
        if (defaultValues.find((val) => val.driverId === currentValue)) {
            return (
                <Checkbox key={currentValue} disabled={true} />
            )
        }
    } else {
        return (
            <Checkbox key={currentValue} onClick={(e) => {
                if (e.target.checked) {
                    onChecked?.([...checked, { driverId: currentValue }]);
                } else {
                    let newData = checked.filter((val) => val.driverId !== e.target.value)
                    onChecked?.([...newData])
                }
            }} value={currentValue}/>
        )
    }
}