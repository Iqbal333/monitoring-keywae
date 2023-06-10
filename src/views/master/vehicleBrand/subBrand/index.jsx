import React, { Component } from 'react';
import { deleteSubBrand, getSubBrand } from '@/api/master/subBrand';
import { Card, Table, Button, Form, Space, Input, Pagination } from 'antd';
import {
  EditFilled,
  PlusOutlined,
  FilterFilled,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Prompt from '@/components/Modal';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';

class SubBrandVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandId: props.match.params.id,
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
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getSubBrand(
      this.state.brandId,
      this.state.listQuery,
      this.state.filter
    ).then((response) => {
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

  handleAdd = () => {
    this.setState({
      addModalOpen: true,
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

  handleCancel = () => {
    this.setState({
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
    });
  };

  handleAddSave = () => {};

  handleDelete = () => {
    deleteSubBrand({
      brandId: this.state.brandId,
      subBrandId: this.state.deleteId,
    })
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
        title: 'Nama Sub Merk',
        dataIndex: 'subBrandName',
        key: 'subBrandName',
      },
      {
        title: 'Action',
        align: 'center',
        key: 'action',
        render: (_, record) => (
          <Space size={'middle'}>
            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  editData: record,
                  editModalOpen: true,
                });
              }}
              size='small'
              icon={<EditFilled />}
            >
              Edit
            </Button>
            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  deleteId: record.subBrandId,
                  deleteModalOpen: true,
                });
              }}
              size='small'
              danger
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
              <Button type='default' icon={<FilterFilled />} onClick={''}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Card title='LIST SUB-MERK KENDARAAN' extra={addBtn}>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.subBrandId}
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
          formName='add-brand'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
          brandId={this.props.match.params.id}
        />
        {this.state.editModalOpen && (
          <EditForm
            formName='edit-brand'
            initValues={this.state.editData}
            open={this.state.editModalOpen}
            confirmLoading={this.state.addModalLoading}
            onCancel={this.handleCancel}
            refresh={this.fetchData}
            brandId={this.props.match.params.id}
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

export default SubBrandVehicle;
