import React, { Component } from 'react';
import { winnerLogs } from '@/api/auction/auction/winnerLogs';
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
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, FilterFilled, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import noImage from '@/assets/images/no-image.png';
import { layerGroup } from 'leaflet';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils';
import './index.less';
import DetailWinnerLogs from './detail';

class WinnerLogs extends Component {
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
      dataCandidate: '',
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    winnerLogs(this.state.listQuery, this.state.filter).then(
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
      dataCandidate: dataX
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
            title: 'NPL',
            dataIndex: 'nplNo',
            key: 'nplNo',
        },
        {
            title: 'Nomor Lot',
            dataIndex: 'auctionNo',
            key: 'auctionNo',
        },
        {
            title: 'Nama',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Tanggal Pembayaran',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            render: (_,record) => (
                <>{dayjs(_,'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</>
            )
        },
        {
            title: 'Tanggal Akhir Pembayaran',
            dataIndex: 'paymentEndDate',
            key: 'paymentEndDate',
            render: (_,record) => (
                <>{dayjs(_,'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</>
            )
        },
      {
        title: 'Bank',
        dataIndex: 'bank',
        key: 'bank',
      },  
      {
        title: 'Nomor Rekening',
        dataIndex: 'bankAccount',
        key: 'bankAccount',
      }, 
      {
        title: 'Nama Pemilik Bank',
        dataIndex: 'bankAccountName',
        key: 'bankAccountName',
      }, 
      {
        title: 'Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        align: 'center',
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
        width: 200,
        render: (data) => (
          <Space wrap direction='horizontal'>
            { data?.paymentStatus !== "Paid" ? (
                <Button title='Detail' size='small' icon={<EyeFilled />} onClick={this.handleAdd.bind(null, data)}>Detail</Button>
            ) : (
                <>
                    <Button title='Detail' size='small' icon={<EyeFilled />} onClick={this.handleAdd.bind(null, data)}>Detail</Button>
                    <Button title='Send' size='small' icon={<UploadOutlined />} className='btn-part'>
                        <Link to='/auction/winner-detail/send' style={{ paddingLeft: '6px'}}>Kirim</Link>
                    </Button>
                </>
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
        <Card title='Semua Kandidat Pemenang'>
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
        <DetailWinnerLogs
            formName='winner log detail'
            open={this.state.addModalOpen}
            confirmLoading={this.state.addModalLoading}
            onCancel={this.handleCancel}
            refresh={this.fetchData}
            datas={this.state.dataCandidate}
        />
      </div>
    );
  }
}

export default WinnerLogs;
