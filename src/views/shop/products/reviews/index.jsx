import { deleteReviews, getReviews } from '@/api/shops/products';
import {
  Button,
  Card,
  Input,
  Pagination,
  Table,
  Form,
  Space,
  Alert,
} from 'antd';
import {
  SearchOutlined,
  FilterFilled,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { Component } from 'react';
import dayjs from 'dayjs';
import Prompt from '@/components/Modal';

export class ReviewsProducts extends Component {
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
      deleteModalOpen: false,
      deleteId: null,
      fetchStatus: false,
      promptTitle: '',
      promptDescription: '',
      alertMessage: '',
      alertType: 'success',
      showPrompt: false,
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getReviews(this.state.listQuery, this.state.filter).then((response) => {
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
        title: 'Nama Produk',
        key: 'product_name',
        dataIndex: 'product_name',
      },
      {
        title: 'Nama Reviewer',
        key: 'customer_name',
        dataIndex: 'customer_name',
      },
      {
        title: 'Komentar',
        key: 'review',
        dataIndex: 'review',
        ellipsis: true,
      },
      {
        title: 'Tanggal Komentar',
        key: 'review_time',
        dataIndex: 'review_time',
        render: (_) => (
          <>{_ ? dayjs(_).format('DD MMMM YYYY HH:mm:ss') : '-'}</>
        ),
      },
      {
        title: 'Rating',
        key: 'rating',
        dataIndex: 'rating',
        width: 70,
        render: (_) => <>{_ ? _ : 0}</>,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (_, record) => (
          <Space size={'middle'}>
            <Button
              size='small'
              type='primary'
              danger
              onClick={() => {
                this.setState({
                  deleteId: record.review_id,
                  deleteModalOpen: true,
                  promptTitle: 'Hapus Data',
                  promptDescription:
                    'Pastikan anda menghapus data yang benar. Data tidak dapat dikembalikan ketika proses hapus berhasil!',
                });
              }}
              icon={<DeleteOutlined />}
            >
              Hapus
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <div className='app-container'>
        {this.state.showPrompt && (
          <Alert
            style={{ marginBottom: 10 }}
            message={this.state.alertMessage}
            type={this.state.alertType}
            closable
            onClose={() => this.setState({ showPrompt: false })}
          />
        )}
        <Prompt
          open={this.state.deleteModalOpen}
          title={this.state.promptTitle}
          description={this.state.promptDescription}
          onAccept={() => {
            deleteReviews(this.state.deleteId)
              .then((results) => {
                if (results.data.success) {
                  this.setState(
                    {
                      alertMessage: results.data.message,
                      showPrompt: true,
                      deleteModalOpen: false,
                    },
                    () => {
                      this.fetchData();
                    }
                  );
                } else {
                  this.setState({
                    alertMessage: results.data.message,
                    alertType: 'info',
                    showPrompt: true,
                    deleteModalOpen: false,
                  });
                }
              })
              .catch((err) => {
                this.setState({
                  alertMessage: err.message,
                  alertType: 'error',
                  showPrompt: true,
                  deleteModalOpen: false,
                });
              });
          }}
          onCancel={() => this.setState({ deleteModalOpen: false })}
        />
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
        <Card title='SEMUA PRODUK'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.review_id}
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

export default ReviewsProducts;
