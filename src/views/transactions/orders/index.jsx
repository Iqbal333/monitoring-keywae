import React, { Component } from 'react';
import {
  getAllTransaction,
  getDetailTransaction,
} from '../../../api/transactions';
import {
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Button,
  Space,
  Table,
  Pagination
} from 'antd';
import { SearchOutlined, FilterFilled, EyeFilled } from '@ant-design/icons';
import moment from 'moment';
import { toRupiah } from '@/utils';
import TransactionDetail from '@/components/Modal/TransactionDetails'

const { RangePicker } = DatePicker;

class Transactions extends Component {
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
      detailModalOpen: false,
      detailModalLoading: false,
      orderId: '',
      currentRowData: null,
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getAllTransaction(this.state.listQuery, this.state.filter).then(
      (response) => {
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
        }));
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

  changeLimit = (current, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 0,
          limit,
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

  handleShowDetail = async (row) => {
    let data = await this.fetchDataDetail(row.orderId);
    this.setState({
      currentRowData: data,
      detailModalOpen: true,
      orderId: row.orderId,
    });
  };

  fetchDataDetail = async (id) => {
    let results = await getDetailTransaction(id);
    return results.data.results ?? {};
  };

  handleCancel = (_) => {
    this.setState({
      detailModalOpen: false,
    });
  };

  render() {
    const columns = [
      {
        title: 'Order Number',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 250,
      },
      {
        title: 'Order Date',
        dataIndex: 'orderDateUnix',
        key: 'orderDate',
        width: 150,
        render: (time) =>
          `${moment.unix(time).format('DD MMMM YYYY HH:mm:ss')}`,
      },
      {
        title: 'Customer',
        dataIndex: ['customers', 'fullName'],
        key: ['customers', 'fullName'],
        ellipsis: true,
      },
      {
        title: 'Service Type',
        dataIndex: 'serviceTypeName',
        key: 'serviceTypeName',
      },
      {
        title: 'Pickup Label',
        dataIndex: 'pickupLabel',
        key: 'pickupLabel',
        ellipsis: true,
      },
      {
        title: 'Dropoff Label',
        dataIndex: 'dropoffLabel',
        key: 'dropoffLabel',
        ellipsis: true,
      },
      {
        title: 'Subtotal',
        dataIndex: 'subTotal',
        key: 'subTotal',
        align: 'right',
        render: (text) => toRupiah(text),
      },
      {
        title: 'App Charge',
        dataIndex: 'appCharge',
        key: 'appCharge',
        align: 'right',
        render: (text) => toRupiah(text),
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        align: 'right',
        render: (text) => toRupiah(text),
      },
      {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        align: 'right',
        render: (text) => toRupiah(text),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 100,
        render: (row) => (
          <Space wrap direction='horizontal'>
            <Button
              title='View'
              size='small'
              icon={<EyeFilled />}
              onClick={this.handleShowDetail.bind(null, row)}
            >
              View
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <div className='app-container'>
        <Card>
          <Form layout='inline'>
            <Form.Item label='Range Date'>
              <RangePicker />
            </Form.Item>
            <Form.Item label='Service Type'>
              <Select style={{ width: 150 }} value={''} onChange={''}>
                <Select.Option value=''>-</Select.Option>
                <Select.Option value='0deb5bb3-faa8-437a-87d3-6337b768b272'>
                  Male
                </Select.Option>
                <Select.Option value='b4d1a750-b3f2-4095-89a1-f3fd500d3afe'>
                  Female
                </Select.Option>
              </Select>
            </Form.Item>
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
        <Card title='LIST ORDERS'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.orderId}
            columns={columns}
            loading={this.state.loading}
            pagination={false}
          ></Table>
          <br />
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
          <TransactionDetail
            data={this.state.currentRowData}
            open={this.state.detailModalOpen}
            confirmLoading={this.state.detailModalLoading}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            orderTransactionId={this.state.orderTransactionId}
          />
        </Card>
      </div>
    );
  }
}

export default Transactions;

// const DetailTransaction = (props) => {
  
//   require('./index.less');

//   let imageWidth = ((window.screen.width / 2) * 236) / window.screen.width
//   let imageHeight = ((window.screen.height / 2) * 118) / window.screen.height

//   return (
//     <>
//     <Modal
//         open={props.open}
//         title='Detail Transaction'
//         onCancel={props.onCancel}
//         destroyOnClose={true}
//         onOk={props.onOk}
//         width={1200}
//         okButtonProps={''}
//         confirmLoading={props.confirmLoading}
//       >
//         <Card title={<Headers image={Logo} imageWidth={imageWidth} imageHeight={imageHeight} status={'Selesai'} time={props.data?.orderDateUnix} orderNo={props.data?.orderNo} />}>
//           <div className="customer-details">
//             <span className="customer-name">{props.data?.customers?.fullName}</span>
//             <span className="customer-email">{props.data?.customers?.email}</span>
//             <span className="customer-phoneNumber">{props.data?.customers?.phoneNumber}</span>
//           </div>
//           <Divider />
//           <div className="billing-details">
//             <div className="billing-child">
//               <span className="billing-label">Sub Total</span>
//               <span className="billing-sub-total">{toRupiah(props.data?.subTotal)}</span>
//             </div>
            
//             <div className="billing-child">
//               <span className="billing-label">App Charge</span>
//               <span className="billing-app">{toRupiah(props.data?.appCharge)}</span>
//             </div>
            
//             <div className="billing-child">
//               <span className="billing-label">Discount</span>
//               <span className="billing-discount">{toRupiah(props.data?.discount)}</span>
//             </div>
            
//             <div className="billing-child">
//               <span className="billing-label">Total</span>
//               <span className="billing-total">{toRupiah(props.data?.totalPrice)}</span>
//             </div>
//           </div>
//           <Divider />
//           <h5 className="head-title">Detail Perjalanan</h5>
//           <div className="pin-container">
//               {/* <CustomMap lat={props.data?.pickupPoint.lat} lng={props.data?.dropoffPoint.lon} markers={[props.data?.pickupPoint, props.data?.dropoffPoint]} /> */}
//               <CustomMapLeaflet lat={props.data?.pickupPoint.lat} lng={props.data?.dropoffPoint.lon} markers={[{ ...props.data?.pickupPoint, label: props.data?.pickupLabel }, { ...props.data?.dropoffPoint, label: props.data?.dropoffLabel }]} />
//           </div>
//         </Card>
//       </Modal>
//       </>
//   )
// }

// const Headers = ({ image, status, time, imageWidth, imageHeight, orderNo }) => {
//   return (
//     <div className="header-container">
//       <div className="header-left">
//         <Image src={image} className="header-left-image" width={imageWidth} height={imageHeight} />
//         <span className="header-left-child">{status}</span>
//       </div>
//       <div className="header-right">
//         <span className="header-right-child">{moment.unix(time ?? new Date()).format('DD MMMM YYYY HH:mm:ss')}</span>
//         <span className="header-right-child">Order {orderNo}</span>
//       </div>
//     </div>
//   )
// }
