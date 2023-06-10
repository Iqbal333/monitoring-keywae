import React, { Component } from 'react';
import { category } from '@/api/auction/auction/category';
import {
  Card,
  Table,
  Button,
  Form,
  Space,
  Pagination,
  Input,
  Avatar,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterFilled,
  EyeFilled,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddForm from './forms/AddForm';
import { Link } from 'react-router-dom';
import noImage from '@/assets/images/no-image.png';
import './index.less';
import EditForm from './forms/EditForm';
import DeleteCategory from './forms/DeleteModal';

class Category extends Component {
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
      deleteModalOpen: false,
      deleteModalLoading: false,
      deleteId: '',
      fetchStatus: false,
      priceId: '',
      dataEdit: [],
      editId: null,
      dataDelete: []
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    category(this.state.listQuery, this.state.filter).then((response) => {
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
      dataEdit: [],
    });
  };

//   handleEdit = (dataX) => {
//     this.setState({
//       editModalOpen: true,
//       dataEdit: dataX
//     });
//   };

  handleCancelEdit = () => {
    this.setState({
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
      dataEdit: [],
      editId: null
    });
  };

//   handleDelete = () => {
//     this.setState({
//       deleteModalOpen: true,
//     });
//   };

  handleCancelDelete = () => {
    this.setState({
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
      dataEdit: [],
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
          limit: 10,
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
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (img) => (
          <>
            <Avatar
              shape='square'
              size={40}
              src={
                img !== null && img !== ''
                  ? img
                  : noImage
              }
            />
          </>
        ),
        width: 100,
        align: 'center',
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        width: 200
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: 200
      },
      {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Action',
        dataIndex: 'categoryId',
        align: 'center',
        width: 200,
        render: (_, record) => (
            <Space wrap>
            <Button
              title='Edit'
              type='primary'
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                this.setState({
                    editModalOpen: true,
                    dataEdit: record,
                    editId: _
                  });
              }}
            >
              Ubah
            </Button>
            <Button
              title='Delete'
              icon={<DeleteOutlined />}
              type='primary'
              size='small'
              danger
              onClick={() => {
                this.setState({
                    deleteModalOpen: true,
                    dataDelete: record
                  });
              }}
            >
              Hapus
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
          Tambah Kategori
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
        <Card title='List Kategori' extra={addBtn}>
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
        <AddForm
          formName='add-category'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={() => {
            this.fetchData();
            this.handleCancel();
          }}
        />
        <EditForm
          formName='edit-category'
          initValues={this.state.dataEdit}
          categoryTypeId={this.state.editId}
          open={this.state.editModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancelEdit}
          refresh={() => {
            this.fetchData();
            this.handleCancelEdit();
          }}
        />
        <DeleteCategory
            formName='delete-category'
            open={this.state.deleteModalOpen}
            confirmLoading={this.state.deleteModalLoading}
            onCancel={this.handleCancelDelete}
            refresh={() => {
                this.fetchData();
                this.handleCancelDelete();
            }}
            datas={this.state.dataDelete}
        />
      </div>
    );
  }
}

export default Category;
