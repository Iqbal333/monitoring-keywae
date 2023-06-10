import { getDetail } from '@/api/shops/customer';
import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  Pagination,
  Space,
  Table,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toRupiah } from '@/utils';

export default function TransactionList({ customer_id }) {
  const [driver, setDriver] = useState([]);
  const [query, setQuery] = useState({ limit: 10, page: 0 });
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDetail(customer_id, query).then((results) => {
      setDriver(results.data.transactionrecord);
    });

    return () => {
      return false;
    };
  }, [query]);

  const handleQuery = () => {
    setDriver([]);
    getDetail(customer_id, query, { search: search }).then((results) => {
      setDriver(results.data.transactionrecord);
    });
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'orderno',
      key: 'orderno',
      align: 'center',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_) => `${toRupiah(_)}`,
    },
    {
      title: 'Metode Pembayaran',
      dataIndex: 'paymentmethod',
      key: 'paymentmethod',
    },
  ];

  const SearchComponent = () => {
    return (
      <Space wrap>
        <Input
          onChange={(e) => setSearch(e.nativeEvent.target.values)}
          value={search}
        />
        <Button icon={<SearchOutlined />} type='primary' onClick={handleQuery}>
          Search
        </Button>
      </Space>
    );
  };

  const changePage = (page) => {
    setQuery((val) => {
      return { ...val, page: page - 1 };
    });
  };

  const changeLimit = (current, limit) => {
    setQuery((val) => {
      return { ...val, limit };
    });
  };

  return (
    <Card title='LIST TRANSAKSI' size='default' extra={<SearchComponent />}>
      <Table
        size='small'
        rowKey={(_) => _.customer_id}
        bordered={true}
        dataSource={driver}
        columns={columns}
        pagination={false}
      />
      <Pagination
        size='small'
        total={driver.length}
        pageSizeOptions={['10', '20', '50', '100']}
        defaultPageSize={query.limit}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={changePage}
        current={query.page + 1}
        onShowSizeChange={changeLimit}
        pageSize={query.limit}
        showSizeChanger
        showQuickJumper
      />
    </Card>
  );
}
