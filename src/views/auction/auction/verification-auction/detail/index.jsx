import { PlusOutlined } from '@ant-design/icons';
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
} from 'antd';
import React, { Component } from 'react';
import noImage from '@/assets/images/no-image.png';
import { verificationAuctionDetail } from '@/api/auction/auction/verificationAuctionDetail';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils';
import AddForm from './forms/AddForm'; 
import Reject from './forms/Reject';
import { BtnBack } from '@/components/Button';
// import BtnBack from '@/components/Button'

export class VerifyDetail extends Component {
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
      addEstimationModalOpen: false,
      addEstimationModalLoading: false, 
      addRejectModalOpen: false,
      addRejectModalLoading: false, 
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
  };

  componentDidMount() {
    this.fetchData();
  }

  handleAddEstimation = () => {
    this.setState({
      addEstimationModalOpen: true,
    });
  };

  handleCancelEstimation = () => {
    this.setState({
      addEstimationModalOpen: false,
    });
  };

  handleAddReject = () => {
    this.setState({
      addRejectModalOpen: true,
    });
  };

  handleCancelReject = () => {
    this.setState({
      addRejectModalOpen: false,
    });
  };

  render() {
    
      const addBtn = (
        <span>
          <Button
            title='Add Estimastion'
            icon={<PlusOutlined />}
            onClick={this.handleAddEstimation}
            style={{marginRight: '14px'}}
          >
            Tentukan Estimasi
          </Button>

          <Button
            title='Reject'
            onClick={this.handleAddReject}
            style={{ backgroundColor: 'red', color: 'white'}}
          >
            Tolak
          </Button>
        </span>
      );

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
        <Card title={<BtnBack to="/auction/verification">Detail Lelang #{this.state.data.auctionNo}</BtnBack>}>
          <div className='container'>
            <AuctionInfo 
                data={this.state.data} 
                addBtn={addBtn} 

                openEst={this.state.addEstimationModalOpen}
                confirmLoadingEst={this.state.addEstimationModalLoading}
                onCancelEst={this.handleCancelEstimation}
                refreshEst={this.fetchData}

                openRjct={this.state.addRejectModalOpen}
                confirmLoadingRjct={this.state.addRejectModalLoading}
                onCancelRjct={this.handleCancelReject}
                refreshRjct={this.fetchData}

            />
          </div>
        </Card>
      </div>
    );
  }
}


export default VerifyDetail;

const AuctionInfo = ({ data, addBtn, openEst, confirmLoadingEst, onCancelEst, refreshEst, openRjct, confirmLoadingRjct, onCancelRjct, refreshRjct}) => {
    return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <Row>
            <Descriptions title={<div style={{fontSize: '24px'}}>{data?.lotName}</div>} bordered style={{width: '60%'}} extra={addBtn}>
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
        <AddForm
            formName='estimasi'
            open={openEst}
            confirmLoading={confirmLoadingEst}
            onCancel={onCancelEst}
            refresh={refreshEst}
            auctionId={data?.auctionId}
        />

        <Reject
            formName='tolak'
            open={openRjct}
            confirmLoading={confirmLoadingRjct}
            onCancel={onCancelRjct}
            refresh={refreshRjct}
            auctionId={data?.auctionId}
            lotName={data?.lotName}
        />
    </>
  );
};
