import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getVehicleType } from '@/api/master/globals/vehicleType';
import { getBrand } from '@/api/master/brand';
import {
  Card,
  Table,
  Button,
  Form,
  Space,
  Avatar,
  Input,
  Pagination,
  Select,
} from 'antd';
import {
  CloseOutlined,
  EditFilled,
  PlusOutlined,
  EyeFilled,
  FilterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import Prompt from '@/components/Modal';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';
import { deleteBrand } from '@/api/master/brand';
import noImage from '@/assets/images/no-image.png';

class BrandVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      vehicleType: [],
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
      deleteId: '',
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getBrand(this.state.listQuery, this.state.filter).then((response) => {
      this.setState({ loading: false });
      const list = response.data.results;
      // console.log(list);
      const total = response.data.meta.total;

      this.setState((state) => ({
        list,
        total,
        listQuery: {
          ...state.listQuery,
          page: response.data.meta.page,
        },
        addModalOpen: false,
        addModalLoading: false,
      }));
    });
  };

  fetchDataFilter = () => {
    getVehicleType().then((res) => {
      if (res.data?.success) {
        this.setState({
          vehicleType: res.data.results,
        });
      }
    });
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

  filterType = (value) => {
    console.log(value);
    this.setState(
      (state) => ({
        filter: {
          ...state.filter,
          vehicleTypeId: value,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  // filterType = (value) => {
  //   this.setState((state) => ({
  //     filter: {
  //       ...state.filter,
  //       vehicleTypeId: value,
  //     },
  //   }));
  // };

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

  handleAdd = () => {
    this.setState({
      addModalOpen: true,
    });
  };

  handleCancel = () => {
    this.setState({
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
    });
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
          // isApprove: true,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  handleAddSave = () => {};

  handleDelete = () => {
    deleteBrand(this.state.deleteId)
      .then((res) => {
        if (res.data.success) {
          this.setState(
            {
              deleteModalOpen: false,
            },
            () => {
              this.fetchData();
            }
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.fetchData();
    this.fetchDataFilter();
  }

  render() {
    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.list.indexOf(record) + 1}</>,
      },
      {
        title: 'Nama Merk',
        dataIndex: 'brandName',
        key: 'brandName',
      },
      {
        title: 'Tipe Servis',
        dataIndex: 'vehicleTypeName',
        key: 'vehicleTypeName',
      },
      {
        title: 'Logo',
        dataIndex: 'brandLogo',
        key: 'brandLogo',
        render: (_, { brandLogo }) => (
          <>
            <Avatar
              shape='square'
              size={35}
              src={_ !== null && _ !== '' ? `${_}` : noImage}
            />
          </>
        ),
        align: 'center',
      },
      {
        title: 'Action',
        align: 'center',
        key: 'action',
        render: (_, record) => (
          <Space size={'middle'}>
            <Link to={`/master/subBrand/${record.brandId}`}>
              <Button type='default' icon={<EyeFilled />} size='small'>
                Detail
              </Button>
            </Link>
            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  editData: record,
                  editModalOpen: true,
                });
              }}
              size='small'
            >
              <EditFilled /> Edit
            </Button>
            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  deleteId: record.brandId,
                  deleteModalOpen: true,
                });
              }}
              size='small'
              danger
            >
              <CloseOutlined /> Delete
            </Button>
          </Space>
        ),
      },
    ];

    const addBtn = (
      <span>
        <Button
          title='Add New'
          icon={<PlusOutlined />}
          onClick={this.handleAdd}
        >
          Add New
        </Button>
      </span>
    );
    return (
      <div className='app-container'>
        <Card>
          <Form layout='inline'>
            <Form.Item label='Vehicle Type :'>
              <Select
                style={{ width: 150 }}
                value={this.state.filter?.vehicleTypeId ?? ''}
                onChange={this.filterType}
                options={this.state.vehicleType}
                fieldNames={{
                  label: 'vehicleName',
                  value: 'vehicleTypeId',
                }}
              />
              {/* <Select.Option value=''>-</Select.Option>
                <Select.Option value='dd3d826d-4fb4-41c8-bad8-da87720a1fb1'>
                  Mobil
                </Select.Option>
                <Select.Option value='d56bb7b5-8b0c-41d1-9566-77982b2dee6d'>
                  Motor
                </Select.Option> */}
            </Form.Item>
            <Form.Item name='search' label='Search'>
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
        <br />
        <Card title='LIST MERK KENDARAAN' extra={addBtn}>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.brandId}
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
        </Card>
        <AddForm
          formName='add-brand'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
        />
        {this.state.editModalOpen && (
          <EditForm
            formName='edit-brand'
            initValues={this.state.editData}
            open={this.state.editModalOpen}
            confirmLoading={this.state.addModalLoading}
            onCancel={this.handleCancel}
            refresh={this.fetchData}
          />
        )}
        <Prompt
          open={this.state.deleteModalOpen}
          title={'Delete Data'}
          description={'Delete this data?'}
          onCancel={this.handleCancel}
          onAccept={this.handleDelete}
        />
      </div>
    );
  }
}

export default BrandVehicle;
