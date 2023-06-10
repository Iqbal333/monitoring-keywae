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
  Button,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  EyeFilled,
  FilterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import noImage from '@/assets/images/no-image.png';
import { getVehicleType } from '@/api/master/globals/vehicleType';

class DriverAll extends Component {
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
        isRegister: true
      },
      vehicleTypes: []
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
        listQuery: { ...state.listQuery, page: response.data.meta.page },
      }));
    });
    getVehicleType().then((response) => {
      if (response.data.success) {
        this.setState((state) => ({
          ...state,
          vehicleTypes: response.data.results
        }))
      }
    })
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

  filterVehicle = (value) => {
    this.setState((state) => ({
      filter: {
        ...state.filter,
        vehicleTypeId: value,
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
        title: <center>No. Registrasi</center>,
        dataIndex: 'driverNo',
        key: 'driverNo',
        width: 200,
      },
      {
        title: <center>Nama Lengkap</center>,
        dataIndex: 'fullName',
        key: 'fullName'
      },
      {
        title: <center>Email</center>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <center>Nomor Telepon</center>,
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: <center>Jenis Kelamin</center>,
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: <center>Tipe</center>,
        dataIndex: 'vehicleType',
        key: 'vehicleType',
      },
      {
        title: <center>Status</center>,
        dataIndex: 'isBanned',
        key: 'isBanned',
        align: 'center',
        width: 50,
        render: (tag) => (
          <>
            <Tag color={tag === 'false' ? 'magenta' : 'green'} key={tag}>
              {tag === 'false' ? 'Dinonaktifkan' : 'Aktif'}
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
            <Button title='Detail' size='small' icon={<EyeFilled />}>
              <Link to={`/driver/details/${data.driverId}`}> Detail</Link>
            </Button>
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
              <Form.Item label='Jenis Kelamin :'>
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
                  <Select.Option value='true'>Tidak Aktif</Select.Option>
                  <Select.Option value='false'>Aktif</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Tipe Kendaraan :'>
                <Select
                  style={{ width: 150 }}
                  value={this.state.filter?.vehicleTypeId ?? '-'}
                  onChange={this.filterVehicle}
                  fieldNames={{
                    label: 'vehicleName',
                    value: 'vehicleTypeId'
                  }}
                  options={this.state.vehicleTypes}
                />
              </Form.Item>
              <Form.Item name='name' label='Cari :'>
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

export default DriverAll;
