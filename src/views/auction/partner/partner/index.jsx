import React, { Component } from 'react';
import { partner } from '@/api/auction/partner/partner';
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
  Button,
  Space,
  Row,
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EyeFilled, FilterFilled, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Icon } from '@/components/Icon';
import CountUp from 'react-countup';
import { eventDashboard } from '@/api/auction/eventAuction/eventDashboard';

class Partner extends Component {
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
        search: '',
        isVerify: true,
        isApprove: true,
        isRegister: true,
      },
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    partner(this.state.listQuery, this.state.filter).then(
      (response) => {
        this.setState({ loading: false });
        const list = response.data.results;
        const total = response.data.meta.total;

        this.setState((state) => ({
          list,
          total,
          listQuery: { ...state.listQuery, page: response.data.meta.page },
        }));
      }
    );
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
          limit: 2,
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
        title: 'Nama Lengkap',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      {
        title: 'Nomor KTP',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: 'Nomor NPWP',
        dataIndex: 'taxIdNumber',
        key: 'taxIdNumber',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Pelelang',
        dataIndex: 'isKeylangSeller',
        key: 'isKeylangSeller',
        align: 'center',
        width: 100,
        render: (tag) => (
            <>
              <Tag color={tag === true ? 'green' : 'magenta'} key={tag}>
                {tag === true ? '✓' : 'X'}
              </Tag>
            </>
          ),
      },
      {
        title: 'Penawar',
        dataIndex: 'isKeylangBuyer',
        key: 'isKeylangBuyer',
        align: 'center',
        width: 100,
        render: (tag) => (
            <>
              <Tag color={tag === true ? 'green' : 'magenta'} key={tag}>
                {tag === true ? '✓' : 'X'}
              </Tag>
            </>
          ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (data) => (
          <Space wrap direction='horizontal' size={'middle'}>
            <Button title='Detail' size='small' icon={<EyeFilled />}>
              <Link to="#"> Detail</Link>
            </Button>
            <Button
              title='Delete'
              icon={<DeleteOutlined />}
              type='primary'
              size='small'
              danger
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <div className='app-container'>
        <Collapse defaultActiveKey={['1']}>
          <Card>
            <Form layout='inline'>
              {/* <Form.Item label='Gender :'>
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
              </Form.Item> */}
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
        <br />
        <Card title='Partner'>
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
    );
  }
}

export default Partner;
