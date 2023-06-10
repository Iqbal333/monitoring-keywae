import { getDetail } from '@/api/shops/customer';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import {
  Button,
  Table,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Descriptions,
  Tabs,
} from 'antd';
import React, { Component } from 'react';
import noImage from '@/assets/images/no-image.png';
import './index.less';
import { toRupiah } from '@/utils';

export class CustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      transaksi: [],
      showPrompt: false,
      loading: false,
    };
  }

  fetchData = async () => {
    this.setState({ loading: true });
    let getData = await getDetail(this.props.match.params.id);

    console.log(getData);
    if (getData.data.success) {
      const data = getData.data.results;
      const transaksi = getData.data.transactionrecord;
      this.setState({
        data,
        transaksi,
        loading: false,
      });
    } else {
      this.setState(
        {
          loading: false,
        },
        () => {}
      );
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  tabItems() {
    return [
      {
        label: 'Pelanggan',
        key: 1,
        children: <CustomerInfo data={this.state.data} />,
      },
      {
        label: 'Transaksi',
        key: 2,
        children: <TransactionInfo transaksi={this.state.transaksi} />,
      },
    ];
  }

  render() {
    return (
      <div className='app-container'>
        <Card
          title='DETAIL PELANGGAN'
          // extra={
          //   this.state.data?.isVerify === false ? (
          //     <>
          //       <Button type='primary' onClick={() => {}}>
          //         <CheckSquareOutlined />
          //         Verifikasi
          //       </Button>
          //       <Button
          //         type='primary'
          //         style={{ marginLeft: 10 }}
          //         danger
          //         onClick={() => {}}
          //       >
          //         <CloseSquareOutlined />
          //         Tolak
          //       </Button>
          //     </>
          //   ) : (
          //     <>
          //       <Button type='primary' onClick={() => {}}>
          //         <CheckSquareOutlined />
          //         Approval
          //       </Button>
          //       <Button
          //         type='primary'
          //         style={{ marginLeft: 10 }}
          //         danger
          //         onClick={() => {}}
          //       >
          //         <CloseSquareOutlined />
          //         Tolak
          //       </Button>
          //     </>
          //   )
          // }
        >
          <div className='container'>
            <Tabs
              style={{ minHeight: 500 }}
              tabPosition='left'
              items={this.tabItems()}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default CustomerDetail;

const CustomerInfo = ({ data }) => {
  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <Descriptions title='Biodata Pelanggan' layout='vertical'>
          <Descriptions.Item
            label='Nama Lengkap'
            labelStyle={{ fontWeight: '600' }}
            strong={true}
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.fullname ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Jenis Kelamin'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.gender ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Email'>
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.email ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nomor Telepon'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.phonee ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Username'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.username ?? '-'}
            </Typography.Text>{' '}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Foto'>
            <Image src={data?.photo ?? noImage} strong={true} width={200} />
          </Descriptions.Item>
          {/* <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Status Approval'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.isApprove === true ? (
                <Tag color='green'>Sudah Disetujui</Tag>
              ) : (
                <Tag color='volcano'>Belum Disetujui</Tag>
              )}
            </Typography.Text>
          </Descriptions.Item> */}
        </Descriptions>
      </Card>
    </>
  );
};

const TransactionInfo = ({ transaksi }) => {
  const columns = [
    {
      title: 'No. Invoice',
      dataIndex: 'orderno',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (_) => (_ ? toRupiah(_) : toRupiah(0)),
    },
    {
      title: 'Metode Pembayaran',
      dataIndex: 'paymentmethod',
    },
  ];

  return (
    <>
      {console.log()}
      {/* <Divider className='divider' /> */}
      {/* <TransactionList customer_id={this.props.match.params.id} /> */}
      {transaksi?.length > 0 ? (
        <Table
          size='small'
          dataSource={transaksi}
          rowKey={(record) => record.customer_id}
          bodyStyle={{ overflowX: 'auto' }}
          columns={columns}
          pagination={true}
        />
      ) : (
        <span className='menu-title'>Transaksi belum tersedia.</span>
      )}
    </>
  );
};
