import React, { Component } from 'react';
import { deleteData, getAllData } from '@/api/merchant/master/companyType';
import { Card, Table, Button, Form, Space, Pagination, Input } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';
import Prompt from '@/components/Modal';

class CompanyType extends Component {
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
        title: 'Tipe Perusahaan',
        dataIndex: 'companyTypeName',
        key: 'companyTypeName',
      },
      {
        title: 'Alias',
        dataIndex: 'companyTypeAlias',
        key: 'companyTypeAlias',
        // align: 'center',
      },
      {
        title: 'Deskripsi',
        dataIndex: 'companyTypeDescription',
        key: 'companyTypeDescription',
        // align: 'center',
        ellipsis: true,
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
            <Button
              size='small'
              type='primary'
              danger
              onClick={() => {
                this.setState({
                  deleteId: record.companyTypeId,
                  deleteModalOpen: true,
                });
              }}
              icon={<DeleteOutlined />}
            >
              Delete
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
        <Card title='LIST TIPE PERUSAHAAN' extra={addBtn}>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.companyTypeId}
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
          formName='add-additional'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
        />
        <EditForm
          formName='edit-additional'
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

export default CompanyType;
