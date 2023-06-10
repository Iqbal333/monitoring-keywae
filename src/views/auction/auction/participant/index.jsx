import React, { Component } from 'react';
import { participantPayment } from '@/api/auction/auction/participantPayment';
import {
  Card,
  Table,
  Avatar,
  Tag,
  Collapse,
  Pagination,
  Form,
  Input,
  Button,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, FilterFilled, SearchOutlined } from '@ant-design/icons';
import noImage from '@/assets/images/no-image.png';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils';
import './index.less';
import DetailParticipant from './detail';

class Participant extends Component {
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
      addModalOpen: false,
      addModalLoading: false, 
      dataPart: '',
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    participantPayment(this.state.listQuery, this.state.filter).then(
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

  handleAdd = (dataX) => {
    this.setState({
      addModalOpen: true,
      dataPart: dataX
    });
  };

  handleCancel = () => {
    this.setState({
      addModalOpen: false,
    });
  };

  render() {
    const columns = [
        {
          title: 'Foto',
          dataIndex: 'proofOfPaymentLink',
          key: 'proofOfPaymentLink',
          render: (img) => (
            <>
              <Avatar
                shape='square'
                size={35}
                src={
                img !== null && img !== ''
                    ? img
                    : noImage
                }
              />
            </>
          ),
          width: 100,
          align: 'center',
        },
        {
            title: 'Nama',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 200
        },
        {
            title: 'Tanggal Pembayaran',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            width: 200,
            render: (_,record) => (
                <>{dayjs(_,'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</>
            )
        },
        {
            title: 'Nominal Deposit',
            dataIndex: 'deposit',
            key: 'deposit',
            width: 150,
            render: (_) => `${_ !== 'NaN' ? toRupiah(_) : '-'}`,
          },
      {
        title: 'Nomor Lot',
        dataIndex: 'auctionNo',
        key: 'auctionNo',
        width: 120
      },
      {
        title: 'Bank',
        dataIndex: 'bank',
        key: 'bank',
        width: 150
      },   
      {
        title: 'Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        align: 'center',
        width: 100,
        render: (tag) => (
            <>
              <Tag color={tag === 'Paid' ? 'green' : 'blue'} key={tag}>
                {tag === 'Paid' ? 'Paid' : 'Waiting'}
              </Tag>
            </>
          ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 50,
        render: (data) => (
          <Space wrap direction='horizontal'>
            { data?.paymentStatus === "Paid" ? (
                <Button title='Detail' size='small' icon={<EyeFilled />} onClick={this.handleAdd.bind(null, data)}>Detail</Button>
            ) : (
                <Button title='Approve' size='small' className='btn-part' onClick={this.handleAdd.bind(null, data)}>Approve</Button>
            ) }
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
              </Form.Item> */}
              {/* <Form.Item label='Status :'>
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
        <Card title='Semua Peserta Lelang'>
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
        <DetailParticipant
            formName='participant detail'
            open={this.state.addModalOpen}
            confirmLoading={this.state.addModalLoading}
            onCancel={this.handleCancel}
            refresh={this.fetchData}
            dataPart={this.state.dataPart}
        />
      </div>
    );
  }
}

export default Participant;
