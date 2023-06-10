import React, { Component } from 'react';
import { deleteData, getAllData } from '@/api/pricing/profit';
import { Card, Table, Button, Form, Space, Pagination, Input, Tag } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';
import { toRupiah } from '@/utils';
import Prompt from '@/components/Modal';

class ProfitSharing extends Component {
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
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Layanan',
        dataIndex: 'serviceTypeName',
        key: 'serviceTypeName',
      },
      {
        title: 'Nilai',
        dataIndex: 'value',
        key: 'value',
        render: (_, record) => `${record.isNominal ? toRupiah(_) : _ + '%'}`,
      },
      {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Publish',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_) =>
          _ ? (
            <Tag color='success'>Di Publish</Tag>
          ) : (
            <Tag color='warning'>Di Sembunyikan</Tag>
          ),
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
              onClick={() => {
                this.setState({
                  editData: record,
                  editModalOpen: true,
                });
              }}
              icon={<EditOutlined />}
            >
              Edit
            </Button>
            {/* <Button
              size='small'
              type='primary'
              danger
              onClick={() => {
                this.setState({
                  deleteId: record.profitSharingId,
                  deleteModalOpen: true,
                });
              }}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button> */}
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
        <Card title='LIST PEMBAGIAN HASIL' extra={addBtn}>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.ProfitSharingId}
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
        <AddForm
          formName='add-profit'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
        />
        <EditForm
          formName='edit-profit'
          initValues={this.state.editData}
          open={this.state.editModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={() => {
            this.fetchData();
            this.handleCancel();
          }}
        />
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

export default ProfitSharing;
