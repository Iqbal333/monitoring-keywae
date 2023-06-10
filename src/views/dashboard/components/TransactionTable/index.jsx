import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import { transactionList } from '@/api/transactions';

const columns = [
  {
    title: 'Order No',
    dataIndex: 'orderNo',
    key: 'orderNo',
    width: 200,
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 195,
    render: (text) => `Rp${text}`,
  },
  {
    title: 'Service',
    key: 'serviceTypeId',
    dataIndex: 'serviceTypeId',
    width: 100,
    render: (serviceTypeId) => (
      <>
        {serviceTypeId === 'aab59a09-a9d0-1a57-0736-e7057899bc05' && (
          <Tag color='magenta' key={serviceTypeId}>
            {serviceTypeId}
          </Tag>
        )}

        {serviceTypeId === 'b0a50b8f-3c40-abc7-489e-225624eada05' && (
          <Tag color='red' key={serviceTypeId}>
            {serviceTypeId}
          </Tag>
        )}

        {serviceTypeId === '8e24f420-7ae6-9553-46e7-5a8959130fd1' && (
          <Tag color='blue' key={serviceTypeId}>
            {serviceTypeId}
          </Tag>
        )}
      </>
    ),
  },
];

class TransactionTable extends Component {
  _isMounted = false; // This variable is used to indicate whether the current component is mounted
  state = {
    list: [],
  };
  fetchData = () => {
    transactionList().then((response) => {
      const list = response.data.results.slice(0, 10);
      if (this._isMounted) {
        this.setState({ list });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.list}
        pagination={false}
      />
    );
  }
}

export default TransactionTable;
