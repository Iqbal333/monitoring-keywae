import React from 'react';
import { Card, Table, Image, Button, Space, Form, Input } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { getBanks } from '@/api/master/bank';
import noImage from '@/assets/images/no-image.png';

class Bank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      banks: [],
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
  }

  fetchData = () => {
    this.setState({ loading: true });
    getBanks(this.state.listQuery, this.state.filter).then((response) => {
      this.setState({ loading: false });
      const banks = response.data.results;

      this.setState((state) => ({
        banks,
        listQuery: { ...state.listQuery, page: 1 },
      }));
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleAdd = (row) => {
    this.setState({
      addModalVisible: true,
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

  render() {
    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.banks.indexOf(record) + 1}</>,
      },
      {
        title: 'Logo',
        dataIndex: 'logo',
        key: 'logo',
        align: 'center',
        width: 150,
        render: (_, record) => (
          <>
            <Image src={_ ? _ : noImage} width={50} preview={false} />
          </>
        ),
      },
      {
        title: 'Nama Bank',
        dataIndex: 'bankName',
        key: 'bankName',
      },
      {
        title: 'Action',
        dataIndex: 'bankId',
        key: 'bankId',
        render: (_, record) => (
          <Space wrap>
            {/* <Button
              title='Edit'
              type='primary'
              icon={<EditOutlined />}
              size='small'
            >
              Edit
            </Button> */}
            <Button
              title='Delete'
              icon={<DeleteOutlined />}
              type='primary'
              size='small'
              danger
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
        <Card title='LIST BANK'>
          <Table
            size='small'
            rowKey={(record) => record.bankId}
            dataSource={this.state.banks}
            columns={columns}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default Bank;
