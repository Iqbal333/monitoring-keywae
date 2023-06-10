import React from 'react';
import { Card, Table, Button, Avatar, Space, Form, Input } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { getServiceType } from '@/api/master/serviceType';
import noImage from '@/assets/images/no-image.png';

class ServiceType extends React.Component {
  state = {
    service: [],
    addModalVisible: false,
    addModalLoading: false,
    loading: false,
    total: 0,
    listQuery: {
      page: 0,
      limit: 10,
    },
    filter: {
      search: '',
    },
  };

  getServiceType = async () => {
    const result = await getServiceType();
    //console.log(result.data);
    const service = result.data.results;

    if (result.data.success === true) {
      this.setState({
        service,
      });
    }
  };

  componentDidMount() {
    this.getServiceType();
  }

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

  handleAdd = (row) => {
    this.setState({
      addModalVisible: true,
    });
  };

  render() {
    const { service } = this.state;
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
    //console.log(gender);

    const columns = [
      {
        title: 'No',
        key: 'No',
        render: (_, record) => <>{this.state.service.indexOf(record) + 1}</>,
      },
      {
        title: 'Logo',
        dataIndex: 'logo',
        key: 'logo',
        render: (_, { logo }) => (
          <>
            <Avatar
              shape='square'
              size={35}
              src={logo !== null && logo !== '' ? logo : noImage}
            />
          </>
        ),
        width: 50,
        align: 'center',
      },
      {
        title: 'Alias',
        dataIndex: 'serviceTypeAlias',
        key: 'serviceTypeAlias',
        align: 'center',
      },
      {
        title: 'Nama Tipe Servis',
        dataIndex: 'serviceTypeName',
        key: 'serviceTypeName',
        align: 'center',
      },
      {
        title: 'Deskripsi',
        dataIndex: 'description',
        key: 'description',
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'serviceTypeId',
      //   key: 'serviceTypeId',
      //   render: (_, record) => (
      //     <Space wrap>
      //       <Button
      //         size='small'
      //         icon={<EditOutlined />}
      //         onClick={() => {
      //           this.setState({
      //             editModalOpen: true,
      //           });
      //         }}
      //         type='primary'
      //       >
      //         Edit
      //       </Button>
      //       <Button
      //         size='small'
      //         icon={<DeleteOutlined />}
      //         onClick={() => {
      //           this.setState({
      //             deleteModalOpen: true,
      //           });
      //         }}
      //         type='primary'
      //         danger
      //       >
      //         Delete
      //       </Button>
      //     </Space>
      //   ),
      // },
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
                onClick={this.getServiceType}
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
        <Card title='LIST TIPE SERVIS' extra={addBtn}>
          <Table
            dataSource={service}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default ServiceType;
