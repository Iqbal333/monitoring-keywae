import React, { Component } from 'react';
import { getConfirmed } from '@/api/shops/orders';
import { Card, Table, Button, Form, Space, Input, Tag, Pagination } from 'antd';
import { SearchOutlined, FilterFilled, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toRupiah } from '@/utils';
import dayjs from 'dayjs';

class ConfirmedOrders extends Component {
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
    getConfirmed(this.state.listQuery, this.state.filter).then((response) => {
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
        title: 'Invoice',
        dataIndex: 'invoiceNo',
        key: 'invoiceNo',
        render: (_) => <>{_ ? _ : <i>Tidak Ada Invoice.</i>}</>,
      },
      {
        title: 'Tanggal Order',
        dataIndex: 'paymentDate',
        key: 'paymentDate',
        align: 'center',
        render: (_, record) => (
          <>{dayjs(_, 'YYYY-MM-DD').format('DD MMMM YYYY')}</>
        ),
      },
      {
        title: 'Nama Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: (_) =>
          _ && Object.keys(_).length > 0 ? (
            <>{_.fullName}</>
          ) : (
            'Tidak Terdaftar'
          ),
        // align: 'center',
        ellipsis: true,
      },
      {
        title: 'Nama Toko',
        dataIndex: 'store',
        key: 'store',
        render: (_) =>
          _ && Object.keys(_).length > 0 ? (
            <>{_.storeName}</>
          ) : (
            'Tidak Terdaftar'
          ),
        // align: 'center',
        ellipsis: true,
      },
      {
        title: 'Harga Total',
        dataIndex: 'total',
        key: 'total',
        render: (_) => `${toRupiah(_)}`,
      },
      {
        title: 'Status Transaksi',
        dataIndex: 'transactionStatus',
        key: 'transactionStatus',
        align: 'center',
        width: 300,
        render: (tag) => (
          <>
            <Tag color={tag === null ? 'magenta' : 'green'} key={tag}>
              {tag === null ? 'TIDAK TERSEDIA' : tag}
            </Tag>
          </>
        ),
      },
      // {
      //   title: 'Status Order',
      //   dataIndex: 'isPaid',
      //   key: 'isPaid',
      //   align: 'center',
      //   width: 50,
      //   render: (tag) =>
      //     tag ? (
      //       <Tag color='green'>Sudah dibayar</Tag>
      //     ) : (
      //       <Tag color='magenta'>Belum dibayar</Tag>
      //     ),
      // },
      {
        title: 'Action',
        dataIndex: 'orderId',
        key: 'action',
        render: (_, record) => (
          <Space size={'middle'}>
            <Link to={'/shop/order-detail/'+_}>
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
        <Card title='TRANSAKSI TERKONFIRMASI'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.orderId}
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

export default ConfirmedOrders;
