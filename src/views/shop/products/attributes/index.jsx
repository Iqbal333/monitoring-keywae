import React, { Component } from 'react';
import { getAttributes } from '@/api/shops/products';
import {
  Card,
  Table,
  Button,
  Form,
  Space,
  Pagination,
  Input,
} from 'antd';
import {
  SearchOutlined,
  FilterFilled,
  EyeFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class AttributesProducts extends Component {
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
    getAttributes(this.state.listQuery, this.state.filter).then((response) => {
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
        title: 'Nama Varian',
        dataIndex: 'name',
        key: 'name',
      },
      // {
      //   title: 'Deskripsi',
      //   dataIndex: 'description',
      //   key: 'description',
      // },
      {
        title: 'Kategori',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
      },
      {
        title: 'Grup',
        dataIndex: 'group',
        key: 'group',
        align: 'center',
      },
      {
        title: 'Tipe',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size={'middle'}>
            {/* <Link to={`/merchant/detail/${record.restaurantId}`}> */}
            <Link to={'/'}>
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
        <Card title='DAFTAR ATRIBUT'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.productvariant_id}
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

export default AttributesProducts;
