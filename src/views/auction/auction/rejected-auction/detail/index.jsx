import { FilterFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Row,
  Typography,
  Image,
  Descriptions,
  Tag,
  Alert,
  Spin,
  Col,
  Collapse,
  Form,
  Input,
  Table,
  Pagination,
} from 'antd';
import React, { Component } from 'react';
import noImage from '@/assets/images/no-image.png';
import { verificationAuctionDetail } from '@/api/auction/auction/verificationAuctionDetail';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils';
import { participant } from '@/api/auction/auction/participant';
import { BtnBack } from '@/components/Button';

export class DetailRejected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      showPrompt: false,
      promptType: 'success',
      promptMessage: '',
      loading: false,
      showAlert: false,
      alertType: 'success',
      alertMessage: '',

      listBid: [],
      totalBid: 0,
      listQueryBid: {
        page: 0,
        limit: 10,
      },
      filterBid: {
        searchBid: '',
        isVerify: true,
        isApprove: true,
        isRegister: true,
      },
      
    };
  }


  fetchData = async () => {
    this.setState({ loading: true });
    let getData = await verificationAuctionDetail({ "auctionId" : this.props.match.params.auctionId});

    if (getData.data.success) {
      const data = getData.data.results;
      this.setState({
        data,
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

    participant(this.props.match.params.auctionId, this.state.listQueryBid, this.state.filterBid).then(
        (response) => {
          this.setState({ loading: false });
          const listBid = response.data.results;
          const totalBid = response.data.meta.total;

          this.setState((state) => ({
            listBid,
            totalBid,
            listQueryBid: {
              ...state.listQueryBid,
              page: response.data.meta.page,
            },
          }));
        }
      );
  };

  componentDidMount() {
    this.fetchData();
  }

  filterSearchBid = (e) => {
    let value = e.target.value;
    this.setState((state) => ({
      listQueryBid: {
        page: 0,
        limit: state.listQueryBid.limit ?? 2,
      },
      filterBid: {
        ...state.filterBid,
        searchBid: value,
      },
    }));
  };

  changePageBid = (page) => {
    this.setState(
      (state) => ({
        listQueryBid: {
          ...state.listQueryBid,
          page: page - 1,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  changeLimitBid = (current, limit) => {
    this.setState(
      (state) => ({
        listQueryBid: {
          ...state.listQueryBid,
          page: 0,
          limit,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  resetFilterBid = () => {
    this.setState(
      (state) => ({
        listQueryBid: {
          page: 0,
          limit: 10,
        },
        filterBid: {
          searchBid: '',
          isApprove: true,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const columnsBid = [
        {
          title: 'Nama',
          dataIndex: 'fullName',
          key: 'fullName',
        },
        {
          title: 'Deposit',
          dataIndex: 'deposit',
          key: 'deposit',
          render: (_) => `${_ !== 'NaN' ? toRupiah(_) : '-'}`,
        },
        {
          title: 'Status',
          dataIndex: 'isWinner',
          key: 'isWinner',
          render: (tag) => (
            <>
              <Tag color={tag === true ? 'green' : ''} key={tag}>
                {tag === true ? '✓' : '-'}
              </Tag>
            </>
          ),
        },
        {
          title: 'Disetujui',
          dataIndex: 'isPayment',
          key: 'isPayment',
          render: (tag) => (
            <>
              <Tag color={tag === true ? 'green' : 'magenta'} key={tag}>
                {tag === true ? '✓' : 'X'}
              </Tag>
            </>
          ),
        },
      ];
    return (
      <div className='app-container'>
        {this.state.loading && (
          <div
            style={{
              zIndex: 1000,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <Spin size='large' />
          </div>
        )}
        {this.state.showAlert && (
          <Alert
            style={{ marginBottom: 10 }}
            message={this.state.alertMessage}
            type={this.state.alertType}
            closable
            onClose={() => this.setState({ showPrompt: false })}
          />
        )}
        <Card title={<BtnBack to="/auction/rejected-auction">Detail Lelang #{this.state.data.auctionNo}</BtnBack>}>
          <div className='container'>
            <Row>
                <AuctionInfo data={this.state.data} />
                <Card style={{width: '50%'}}>
                    <Typography.Text strong={true} style={{ fontSize: '22px'}}>List Bidding</Typography.Text>
                    <Collapse defaultActiveKey={['1']} style={{marginTop: '20px'}}>
                        <Card>
                        <Form layout='inline'>
                            <Form.Item name='name' label='Search :'>
                            <Input
                                style={{ width: 250 }}
                                value={this.state.filterBid?.searchBid ?? ''}
                                onChange={this.filterSearchBid}
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
                                onClick={this.resetFilterBid}
                            >
                                Reset
                            </Button>
                            </Form.Item>
                        </Form>
                        </Card>
                    </Collapse>
                    <Card>
                        <Table
                        size='small'
                        dataSource={this.state.listBid}
                        rowKey={(record) => record.driverId}
                        bodyStyle={{ overflowX: 'auto' }}
                        columns={columnsBid}
                        loading={this.state.loading}
                        pagination={false}
                        ></Table>
                        <br />
                        <Pagination
                        size='small'
                        total={this.state.totalBid}
                        pageSizeOptions={['10', '20', '50', '100']}
                        defaultPageSize={this.state.listQueryBid.limit}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                        }
                        onChange={this.changePageBid}
                        current={this.state.listQueryBid.page + 1}
                        onShowSizeChange={this.changeLimit}
                        pageSize={this.state.listQueryBid.limit}
                        showSizeChanger
                        showQuickJumper
                        />
                    </Card>
                </Card>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}


export default DetailRejected;

const AuctionInfo = ({ data }) => {
    return (
    <>
      <Card style={{ marginBottom: 10, width: '50%' }}>
        <Col style={{ alignItems: 'center'}}>
            <div style={{ marginTop: '10px',}}>
                <Image
                    src={data?.images?.[0].lotImageLink ?? noImage}
                    strong={true}
                    width={320}
                />
            </div>
            <div style={{fontSize: '24px', margin: '10px 0'}}>{data?.lotName}</div>
            <div style={{fontSize: '16px', margin: '10px 0 20px 0'}}>{data?.description}</div>
            <Descriptions bordered>
                <Descriptions.Item
                    span={3}
                    label='Tahun Pembuatan'
                    labelStyle={{ fontWeight: '600' }}
                    strong={true}
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                    {data?.years ?? '-'}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Lokasi'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                    {data?.location ?? '-'}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Kondisi'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                    {data?.condition ?? '-'}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                labelStyle={{ fontWeight: '600' }} label='Kategori'>
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                    {data?.category ?? '-'}
                    </Typography.Text>{' '}
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Tipe Lelang'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        <Tag color='green'>
                            {data?.types ?? '-'}
                        </Tag>
                    </Typography.Text>{' '}
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Pelaksaan Lelang'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {dayjs(data?.auctionStartDate,'YYYY-MM-DD').format('DD MMMM YYYY')} s/d {dayjs(data?.auctionEndDate,'YYYY-MM-DD').format('DD MMMM YYYY')}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Harga Awal'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {toRupiah(data?.openingBid)}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Harga Estimasi'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {toRupiah(data?.estimationBid)}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Min Deposit'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {toRupiah(data?.deposit)}
                    </Typography.Text>
                </Descriptions.Item>


                <Descriptions.Item
                    span={3}
                    labelStyle={{ fontWeight: '600' }}
                    label='Tanggal Pengembalian Deposit'
                >
                    <Typography.Text strong={true} style={{ fontSize: 15 }}>
                        {dayjs(data?.depositEndDate,'YYYY-MM-DD').format('DD MMMM YYYY')}
                    </Typography.Text>
                </Descriptions.Item>
            </Descriptions>
        </Col>
      </Card>
    </>
  );
};
