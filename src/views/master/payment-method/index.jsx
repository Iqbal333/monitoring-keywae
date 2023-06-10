import React from 'react';
import { Card, Table, Button, Space, Form, Input } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { getPaymentMethod } from '@/api/master/paymentMethod';

class PaymentMethod extends React.Component {
  state = {
    payment: [],
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

  getPaymentMethod = async () => {
    const result = await getPaymentMethod();
    //console.log(result.data);
    const payment = result.data.results;

    if (result.data.success === true) {
      this.setState({
        payment,
      });
    }
  };

  componentDidMount() {
    this.getPaymentMethod();
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
    const { payment } = this.state;
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
    //console.log(payment);

    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.payment.indexOf(record) + 1}</>,
      },
      {
        title: 'Payment Method Name',
        dataIndex: 'paymentMethodName',
        key: 'paymentMethodName',
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'paymentMethodId',
      //   key: 'paymentMethodId',
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
                onClick={this.getPaymentMethod}
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
        <Card title='LIST PAYMENT METHOD' extra={addBtn}>
          <Table
            dataSource={payment}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
      // <div className='app-container'>
      //   <Card title='LIST PAYMENT METHOD' extra={addBtn}>
      //     <Table rowKey='paymentMethodId' dataSource={payment}>
      //       <Column
      //         width={500}
      //         title='ID'
      //         dataIndex='paymentMethodId'
      //         key='paymentMethodId'
      //         align='left'
      //       />
      //       <Column
      //         title='Payment Method Name'
      //         dataIndex='paymentMethodName'
      //         key='paymentMethodName'
      //         align='left'
      //       />
      //       <Column
      //         title='Actions'
      //         key='action'
      //         width={195}
      //         align='center'
      //         render={(text, row) => (
      //           <Space wrap>
      //             <Button title='Edit' icon={<EditOutlined />} size='small'>
      //               Edit
      //             </Button>
      //             <Button
      //               title='Delete'
      //               icon={<DeleteOutlined />}
      //               size='small'
      //               danger
      //             >
      //               Delete
      //             </Button>
      //           </Space>
      //         )}
      //       />
      //     </Table>
      //   </Card>
      // </div>
    );
  }
}

export default PaymentMethod;
