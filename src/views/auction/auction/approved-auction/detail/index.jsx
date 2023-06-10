  import { FilterFilled, SearchOutlined } from '@ant-design/icons';
  import {
    Button,
    Card,
    Avatar,
    Form,
    Input,
    Collapse,
    Table,
    Row,
    Typography,
    Image,
    Descriptions,
    Pagination,
    Tag,
    Alert,
    Spin,
  } from 'antd';
  import React, { Component } from 'react';
  import noImage from '@/assets/images/no-image.png';
  import { verificationAuctionDetail } from '@/api/auction/auction/verificationAuctionDetail';
  import dayjs from 'dayjs';
  import { toRupiah } from '@/utils';
  import { participantBid } from '@/api/auction/auction/participantBid';
  import { participant } from '@/api/auction/auction/participant';
  import Complete from './modal/Complete';
import Publish from './modal/Publish';
import Unpublish from './modal/Unpublish';
import { BtnBack } from '@/components/Button';
  
  export class ApprovedDetail extends Component {
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

        listWin: [],
        totalWin: 0,
        listQueryWin: {
          page: 0,
          limit: 10,
        },
        filterWin: {
          searchWin: '',
          isVerify: true,
          isApprove: true,
          isRegister: true,
        },

        addCompleteModalOpen: false,
        addCompleteModalLoading: false, 
        addPublishModalOpen: false,
        addPublishModalLoading: false,
        addUnpublishModalOpen: false,
        addUnpublishModalLoading: false,
      };
    }

    fetchData = async () => {
      this.setState({ loading: true });
      let getData = await verificationAuctionDetail({
        "auctionId": this.props.match.params.auctionId,
      });

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

      participantBid(this.props.match.params.auctionId, this.state.listQueryBid, this.state.filterBid).then(
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

    //   ====

    filterSearchWin = (e) => {
      let value = e.target.value;
      this.setState((state) => ({
        listQueryWin: {
          page: 0,
          limit: state.listQueryWin.limit ?? 2,
        },
        filterWin: {
          ...state.filterWin,
          search: value,
        },
      }));
    };

    changePageWin = (page) => {
      this.setState(
        (state) => ({
          listQueryWin: {
            ...state.listQueryWin,
            page: page - 1,
          },
        }),
        () => {
          this.fetchData();
        }
      );
    };

    changeLimitWin = (current, limit) => {
      this.setState(
        (state) => ({
          listQueryWin: {
            ...state.listQueryWin,
            page: 0,
            limit,
          },
        }),
        () => {
          this.fetchData();
        }
      );
    };

    resetFilterWin = () => {
      this.setState(
        (state) => ({
          listQueryWin: {
            page: 0,
            limit: 10,
          },
          filterWin: {
            search: '',
            isApprove: true,
          },
        }),
        () => {
          this.fetchData();
        }
      );
    };

    handleAddComplete = () => {
        this.setState({
            addCompleteModalOpen: true,
        });
    };
    
    handleCancelComplete = () => {
        this.setState({
            addCompleteModalOpen: false,
        });
    };

    handleAddPublish = () => {
        this.setState({
            addPublishModalOpen: true,
        });
    };
    
    handleCancelPublish = () => {
        this.setState({
            addPublishModalOpen: false,
        });
    };

    handleAddUnpublish = () => {
        this.setState({
            addUnpublishModalOpen: true,
        });
    };
    
    handleCancelUnpublish = () => {
        this.setState({
            addUnpublishModalOpen: false,
        });
    };

    render() {
      const columnsBid = [
        {
          title: 'NPL',
          dataIndex: 'nplNo',
          key: 'nplNo',
        },
        {
          title: 'Nama',
          dataIndex: 'fullName',
          key: 'fullName',
        },
        {
          title: 'Bidding',
          dataIndex: 'bid',
          key: 'bid',
        },
        {
          title: 'Tanggal Bid',
          dataIndex: 'offeringDate',
          key: 'offeringDate',
          render: (_, record) => (
            <>
              {dayjs(_, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}
            </>
          ),
        },
      ];

      const columnsWin = [
          {
            title: 'Nama',
            dataIndex: 'fullName',
            key: 'fullName',
          },
          {
            title: 'Foto',
            dataIndex: 'proofOfPaymentLink',
            key: 'proofOfPaymentLink',
            render: (img) => (
              <>
                <Avatar
                  shape='square'
                  size={35}
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
          title: 'Deposit',
          dataIndex: 'deposit',
          key: 'deposit',
          render: (_) => `${_ !== 'NaN' ? toRupiah(_) : '-'}`,
        },
        {
          title: 'Status',
          dataIndex: 'isPayment',
          key: 'isPayment',
          render: (tag) => (
            <>
              <Tag color={tag === 'Paid' ? 'green' : 'blue'} key={tag}>
                {tag === 'Paid' ? 'Paid' : 'Unpaid'}
              </Tag>
            </>
          ),
        },
        {
          title: 'Pemenang',
          dataIndex: 'isWinner',
          key: 'isWinner',
        },
      ];

      const addBtn = (
            <span>
                <Button
                    title='Add Estimastion'
                    onClick={this.handleAddComplete}
                    style={{marginRight: '14px', backgroundColor: 'green', color: 'white'}}
                >
                    Selesaikan
                </Button>

                <Button
                    title='Reject'
                    onClick={this.handleAddUnpublish}
                    style={{ backgroundColor: 'red', color: 'white'}}
                >
                    Batalkan Terbit
                </Button>
            </span>
      )

      const addBtnSecondary = (
        <span>
            <Button
                title='Add Estimastion'
                onClick={this.handleAddComplete}
                style={{marginRight: '14px', backgroundColor: 'green', color: 'white'}}
            >
                Selesaikan
            </Button>

            <Button
                title='Reject'
                onClick={this.handleAddPublish}
                style={{ backgroundColor: 'blue', color: 'white'}}
            >
                Terbitkan
            </Button>

        </span>
  )

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
          <Card title={<BtnBack to="/auction/approved">Detail Lelang #{this.state.data.auctionNo}</BtnBack>}>

            <div className='container'>
              <AuctionInfo 
                addBtn={addBtn} 
                addBtnSecondary={addBtnSecondary}
                data={this.state.data} 

                openCmplt={this.state.addCompleteModalOpen}
                confirmLoadingCmplt={this.state.addCompleteModalLoading}
                onCancelCmplt={this.handleCancelComplete}
                refreshCmplt={this.fetchData}

                openPblsh={this.state.addPublishModalOpen}
                confirmLoadingPblsh={this.state.addPublishModalLoading}
                onCancelPblsh={this.handleCancelPublish}
                refreshPblsh={this.fetchData}

                openUnpblsh={this.state.addUnpublishModalOpen}
                confirmLoadingUnpblsh={this.state.addUnpublishModalLoading}
                onCancelUnpblsh={this.handleCancelUnpublish}
                refreshUnpblsh={this.fetchData}
                
            />
            </div>

            <Row justify={"space-between"} style={{ marginTop: '40px'}}>
              <Card style={{width: '48%', borderColor: '#cccccc', borderWidth: '2px'}}>
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

              <Card style={{width: '48%', borderColor: '#cccccc', borderWidth: '2px'}}>
                <Typography.Text strong={true} style={{ fontSize: '22px'}}>Persetujuan Pemenang</Typography.Text>
                <Collapse defaultActiveKey={['2']} style={{marginTop: '20px'}}>
                  <Card>
                    <Form layout='inline'>
                      <Form.Item name='name' label='Search :'>
                        <Input
                          style={{ width: 250 }}
                          value={this.state.filter?.search ?? ''}
                          onChange={this.filterSearchWin}
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
                          onClick={this.resetFilterWin}
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
                    dataSource={this.state.listWin}
                    rowKey={(record) => record.driverId}
                    bodyStyle={{ overflowX: 'auto' }}
                    columns={columnsWin}
                    loading={this.state.loading}
                    pagination={false}
                  ></Table>
                  <br />
                  <Pagination
                    size='small'
                    total={this.state.totalWin}
                    pageSizeOptions={['10', '20', '50', '100']}
                    defaultPageSize={this.state.listQueryWin.limit}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    onChange={this.changePageWin}
                    current={this.state.listQueryWin.page + 1}
                    onShowSizeChange={this.changeLimit}
                    pageSize={this.state.listQueryWin.limit}
                    showSizeChanger
                    showQuickJumper
                  />
                </Card>
              </Card>
            </Row>
          </Card>
        </div>
      );
    }
  }
  
  
  export default ApprovedDetail;
  
  const AuctionInfo = ({ data, addBtn, addBtnSecondary, openCmplt, confirmLoadingCmplt, onCancelCmplt, refreshCmplt, openPblsh, confirmLoadingPblsh, onCancelPblsh, refreshPblsh, openUnpblsh, confirmLoadingUnpblsh, onCancelUnpblsh, refreshUnpblsh}) => {
      return (
      <>
        <Card style={{ marginBottom: 10 }} >
          <Row>
              <Descriptions title={<div style={{fontSize: '24px'}}>{data?.lotName}</div>} bordered style={{width: '60%'}} extra={data?.ispublish === true ? addBtn : addBtnSecondary}>
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
              <div style={{ marginLeft: '100px', marginTop: '50px'}}>
                  <Image
                      src={data?.images?.[0].lotImageLink ?? noImage}
                      strong={true}
                      width={320}
                  />
              </div>
          </Row>
        </Card>

        <Complete
            formName='selesaikan'
            open={openCmplt}
            confirmLoading={confirmLoadingCmplt}
            onCancel={onCancelCmplt}
            refresh={refreshCmplt}
            auctionId={data?.auctionId}
            lotName={data?.lotName}
        />

        <Publish
            formName='terbitkan'
            open={openPblsh}
            confirmLoading={confirmLoadingPblsh}
            onCancel={onCancelPblsh}
            refresh={refreshPblsh}
            auctionId={data?.auctionId}
            lotName={data?.lotName}
        />

        <Unpublish
            formName='membatalkan'
            open={openUnpblsh}
            confirmLoading={confirmLoadingUnpblsh}
            onCancel={onCancelUnpblsh}
            refresh={refreshUnpblsh}
            auctionId={data?.auctionId}
            lotName={data?.lotName}
        />
      </>
    );
  };
  