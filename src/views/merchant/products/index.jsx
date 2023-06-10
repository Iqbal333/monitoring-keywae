import React, { Component } from 'react';
import { deleteData, getAllData } from '@/api/merchant/product';
import {
  Card,
  Table,
  Button,
  Form,
  Pagination,
  Input,
  Tag,
  Avatar,
} from 'antd';
import {
  SearchOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { toRupiah } from '@/utils';
import Prompt from '@/components/Modal';
import noImage from '@/assets/images/no-image.png';

class AllProduct extends Component {
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
      deleteId: '',
      fetchStatus: false,
      priceId: '',
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getAllData(this.state.listQuery, this.state.filter).then((response) => {
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

  handleDelete = () => {
    deleteData(this.state.deleteId)
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
        title: 'Ikon',
        dataIndex: 'productCategoryIcon',
        key: 'productCategoryIcon',
        render: (_, { productCategoryIcon }) => (
          <>
            <Avatar
              shape='square'
              size={35}
              src={
                productCategoryIcon !== null && productCategoryIcon !== ''
                  ? productCategoryIcon
                  : noImage
              }
            />
          </>
        ),
        width: 50,
        align: 'center',
      },
      {
        title: 'Nama Produk',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'Total Harga',
        dataIndex: 'productTotalPrice',
        key: 'productTotalPrice',
        render: (_) => `${toRupiah(_)}`,
      },
      {
        title: 'Status',
        dataIndex: 'productStatus',
        key: 'productStatus',
        align: 'center',
        width: 200,
        render: (tag) => (
          <>
            <Tag
              color={tag === 'Product Active / Available' ? 'green' : 'magenta'}
              key={tag}
            >
              {tag}
            </Tag>
          </>
        ),
      },
      {
        title: 'Kategori',
        dataIndex: 'productCategory',
        key: 'productCategory',
        align: 'center',
      },
      {
        title: 'Deskripsi',
        dataIndex: 'productDescription',
        key: 'productDescription',
        // align: 'center',
        ellipsis: true,
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
        <Card title='LIST SEMUA PRODUK'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.priceId}
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

export default AllProduct;
