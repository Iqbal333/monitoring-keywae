import React, { Component } from 'react';
import { getAllDriver } from '@/api/drivers';
import {
  Card,
  Table,
  Avatar,
  Tag,
  Collapse,
  Pagination,
  Form,
  Input,
  Select,
  Space,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, SearchOutlined } from '@ant-design/icons';
import noImage from '@/assets/images/no-image.png';

class DriverPending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
      total: 0,
      listQuery: {
        page: 0,
        limit: 10,
      },
      filter: {
        isApprove: false,
        search: '',
      },
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getAllDriver(this.state.listQuery, this.state.filter).then((response) => {
      this.setState({ loading: false });
      const list = response.data.results;
      const total = response.data.meta.total;

      this.setState((state) => ({
        list,
        total,
        listQuery: {
          ...state.listQuery,
          page: response.data.meta.page,
        },
      }));
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  filterGender = (value) => {
    this.setState((state) => ({
      filter: {
        ...state.filter,
        genderId: value,
      },
    }));
  };

  filterStatus = (value) => {
    this.setState((state) => ({
      filter: {
        ...state.filter,
        isBanned: value,
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
        isApprove: false,
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
          limit: state.listQuery.limit ?? 2,
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

  render() {
    const columns = [
      {
        title: '#',
        dataIndex: 'photo',
        key: 'photo',
        render: (_, { photo }) => (
          <>
            <Avatar
              shape='square'
              size={35}
              src={photo !== null && photo !== '' ? photo : noImage}
            />
          </>
        ),
        width: 50,
        align: 'center',
      },
      {
        title: 'Regitration Number',
        dataIndex: 'driverNo',
        key: 'driverNo',
        width: 200,
      },
      {
        title: 'Fullname',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (text, record) => <span>{text}</span>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Banned',
        dataIndex: 'isBanned',
        key: 'isBanned',
        width: 50,
        align: 'center',
        render: (tag) => (
          <>
            <Tag color={tag === 'false' ? 'magenta' : 'green'} key={tag}>
              {tag === 'false' ? 'BANNED' : 'NO BANNED'}
            </Tag>
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_,{ driverId, isApprove }) => (
          <Space wrap direction='horizontal'>
            <Link to={'/driver/details/'+driverId}>
              <Button size="small" icon={<EyeFilled />}>
                <span>Details</span>
              </Button>
            </Link>
          </Space>
        ),
      },
    ];
    //console.log(data);
    return (
      <div className='app-container'>
        <Collapse defaultActiveKey={['1']}>
          <Card>
            <Form layout='inline'>
              <Form.Item label='Gender :'>
                <Select
                  style={{ width: 150 }}
                  value={this.state.filter?.genderId ?? ''}
                  onChange={this.filterGender}
                >
                  <Select.Option value=''>-</Select.Option>
                  <Select.Option value='0deb5bb3-faa8-437a-87d3-6337b768b272'>
                    Male
                  </Select.Option>
                  <Select.Option value='b4d1a750-b3f2-4095-89a1-f3fd500d3afe'>
                    Female
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Status :'>
                <Select
                  style={{ width: 150 }}
                  value={this.state.filter?.isBanned ?? ''}
                  onChange={this.filterStatus}
                >
                  <Select.Option value=''>-</Select.Option>
                  <Select.Option value='true'>Banned</Select.Option>
                  <Select.Option value='false'>No Banned</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name='name' label='Search :'>
                <Input
                  style={{ width: 250 }}
                  value={this.state.filter.search}
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
            </Form>
          </Card>
        </Collapse>
        <br />
        <Card title='LIST DRIVER'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.driverId}
            bodyStyle={{ overflowX: 'auto' }}
            columns={columns}
            loading={this.state.loading}
            pagination={false}
          ></Table>
          <br />
          <Pagination
            size='small'
            total={this.state.total}
            pageSizeOptions={['2', '4', '6']}
            defaultPageSize={this.state.listQuery.limit}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={this.changePage}
            current={this.state.listQuery.page + 1}
            onShowSizeChange={this.changeLimit}
            showSizeChanger
            showQuickJumper
          />
        </Card>
      </div>
    );
  }
}

export default DriverPending;
