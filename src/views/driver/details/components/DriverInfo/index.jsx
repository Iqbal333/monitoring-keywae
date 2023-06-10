import { getDetailDriver } from '@/api/drivers';
import { ArrowLeftOutlined, CheckSquareOutlined, CloseCircleOutlined, IdcardFilled, MailFilled, ManOutlined, PhoneFilled, WalletFilled, WomanOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Image, Skeleton, Typography } from 'antd';
import React, { Component } from 'react';
import './index.less';
import noImage from '@/assets/images/no-image.png';

class DriverInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      widthPhoto: ((window.screen.width / 2) * 354) / window.screen.width,
      heightPhoto: ((window.screen.height / 2) * 472) / window.screen.height,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    getDetailDriver(this.props.driverId).then(results => {
      const data = results.data?.results ?? [];
      this.setState({
        data,
        loading: false
      })
    })
  }

  render() {
    return this.state.loading ? (
      <SkeletonComponent width={this.state.widthPhoto} height={this.state.heightPhoto} />
    ) : (
      <Card title={<Header />}>
        <div className="content-container">
          <Image src={this.state.data?.photo ? this.state.data?.photo : noImage} width={this.state.widthPhoto} />
          <Typography.Text strong={true} className="driver-name">{this.state.data?.fullName} {this.state.data?.gender?.toLowerCase() === 'laki-laki' ? <ManOutlined style={{ color: "#ab8ce4" }} /> : <WomanOutlined style={{ color: '#f644a5' }} />}</Typography.Text>
          <span className="driver-info"><IdcardFilled style={{ color: "#ED2C2D", fontSize: 18 }} /> {this.state.data?.idNumber}</span>
          <span className="driver-info"><MailFilled style={{ color: "#D6AB0A", fontSize: 18 }} /> {this.state.data?.email}</span>
          <span className="driver-info"><PhoneFilled style={{ color: "#28A000", fontSize: 18 }} /> {this.state.data?.phoneNumber}</span>
          <span className="driver-info"><PhoneFilled style={{ color: "#28A000", fontSize: 18 }} /> {this.state.data?.phoneNumberSecondary ? this.state.data?.phoneNumberSecondary : '-'}</span>
          {this.props?.isVerify ? (
            <></>
            ) : (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
                <Button
                  title='Verifikasi'
                  type='primary'
                  onClick={this.props?.verifyAcc}
                >
                  <CheckSquareOutlined /> Verifikasi
                </Button>
              </div>
            )}
        </div>
      </Card>
    );
  }
}

const Header = (props) => {
  return (
    <div className="header-container">
      <span className="fw-bold">Driver Info</span>
      <Button icon={<ArrowLeftOutlined />} onClick={() => {
        window.history.back()
      }}>
        <span>Back</span>
      </Button>
    </div>
  )
}

const SkeletonComponent = (props) => {
  return (
    <div className="container">
      <Header name={""} />
      <Divider />
      <div className="container-profile">
        <Skeleton.Image active className="image-child" style={{ width: props.width, height: props.height }} />
        <Skeleton.Button active className="image-child" />
        <Skeleton.Input active className="input-child" />
        <Skeleton.Input active className="input-child" />
        <Skeleton.Input active className="input-child" />
        <Skeleton.Input active className="input-child" />
      </div>
    </div>
  )
}

export default DriverInfo;
