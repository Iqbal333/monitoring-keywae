import React, { Component } from 'react';
import { getAllCustomer } from '@/api/shops/customer';
import {
  Card,
  Table,
  Button,
  Form,
  Space,
  Input,
  Avatar,
  Pagination,
} from 'antd';
import { SearchOutlined, FilterFilled, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import noImage from '@/assets/images/no-image.png';

class AllCustomer extends Component {
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
      },
      addModalOpen: false,
      editModalOpen: false,
      addModalLoading: false,
      editModalLoading: false,
      editData: [],
      deleteModalOpen: false,
      fetchStatus: false,
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getAllCustomer(this.state.listQuery, this.state.filter).then((response) => {
      this.setState({ loading: false });
      const list = response.data.results;
      const total = response.data.meta.total;
      console.log(list);

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
      editData: [],
    });
  };

  handleAddSave = () => {};

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

  changeLimit = (limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 0,
          limit: state.listQuery.limit ?? limit,
        },
      }),
      () => {
        this.fetchData();
      }
    );
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

  resetFilter = () => {
    this.setState(
      (state) => ({
        listQuery: {
          page: 0,
          limit: 2,
        },
        filter: {
          search: '',
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const columns = [
      {
        title: '#',
        dataIndex: 'userinfo',
        key: 'userinfo',
        render: (_) => (
          <>
            {/* {console.log('userinfo', _)} */}
            <Avatar
              shape='square'
              size={35}
              src={
                Object.keys(_).length > 0 && _.image_file !== null
                  ? _.image_file
                  : noImage
              }
            />
          </>
        ),
        width: 50,
        align: 'center',
      },
      {
        title: 'Nama Lengkap',
        dataIndex: 'fullname',
        key: 'fullname',
        render: (_) => <>{_ ? _ : <i>Tidak terdaftar.</i>}</>,
      },
      {
        title: 'Jenis Kelamin',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center',
        render: (_) => <>{_ ? _ : <i>Tidak terdaftar.</i>}</>,
      },
      {
        title: 'Tanggal Lahir',
        dataIndex: 'birthDate',
        key: 'birthDate',
        align: 'center',
        render: (_) => <>{_ ? _ : <i>Tidak terdaftar.</i>}</>,
      },
      {
        title: 'No. Hp',
        dataIndex: 'userinfo',
        key: 'userinfo',
        render: (_) =>
          _ &&
          Object.keys(_).length > 0 &&
          _ !== null &&
          _.phone_number !== '' ? (
            <>{_.phone_number}</>
          ) : (
            'Tidak Terdaftar'
          ),
        align: 'center',
      },
      // {
      //   title: 'Status Transaksi',
      //   dataIndex: 'transactionStatus',
      //   key: 'transactionStatus',
      //   align: 'center',
      //   width: 300,
      //   render: (tag) => (
      //     <>
      //       <Tag color={tag === null ? 'magenta' : 'green'} key={tag}>
      //         {tag === null ? 'TIDAK TERSEDIA' : tag}
      //       </Tag>
      //     </>
      //   ),
      // },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size={'middle'}>
            <Link to={`/shop/all-customer/detail/${record.customer_id}`}>
              <Button size='small' icon={<EyeFilled />} type='default'>
                Details
              </Button>
            </Link>
          </Space>
        ),
      },
    ];
    return (
      <div className='app-container'>
        <Card>
          <Form layout='inline'>
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
        <Card title='SEMUA PELANGGAN'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.customer_id}
            bodyStyle={{ overflowX: 'auto' }}
            columns={columns}
            loading={this.state.loading}
            pagination={false}
          />
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
        {/* <AddForm
          formName='add-additional'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
        /> */}
        {/* <EditForm
          formName='edit-permit'
          initValues={this.state.editData}
          open={this.state.editModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={() => {
            this.fetchData();
            this.handleCancel();
          }}
        /> */}
      </div>
    );
  }
}

export default AllCustomer;
