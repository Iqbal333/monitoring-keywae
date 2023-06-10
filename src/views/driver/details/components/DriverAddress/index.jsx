import { getDetailDriver } from '@/api/drivers';
import { Card, Col, Row, Skeleton } from 'antd'
import React, { Component } from 'react'
import './index.less';

class DriverAddress extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            loading: false
        }
    } 

    componentDidMount() {
        this.setState({
            loading: true
        })
        getDetailDriver(this.props.driverId).then(results => {
          const data = results.data?.results?.address ?? [];
          data.status = results.data?.results?.isVerify;
          this.setState({
            data,
            loading: false
          })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

  render() {
    return this.state.loading ? (
        <SkeletonComponent />
        ):(
        <Card title={<Header status={this.state.data?.status} />} style={{ marginTop: '5px' }}>
            <div className="info-container">
                <span className="info-title">Alamat</span>
                <span className="info-value">{this.state.data.currentAddress}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Provinsi</span>
                <span className="info-value">{this.state.data.currentRegionName}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Kabupaten/Kota</span>
                <span className="info-value">{this.state.data.currentDistrictName}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Kecamatan</span>
                <span className="info-value">{this.state.data.currentSubDistrictName}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Kelurahan</span>
                <span className="info-value">{this.state.data.currentVillageName}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Kode Pos</span>
                <span className="info-value">{this.state.data.currentPostalCode}</span>
            </div>
            <div className="info-container">
                <span className="info-title">Lokasi</span>
                <span className="info-value">{this.state.data.currentLocation ?? 'No Location'}</span>
            </div>
        </Card>
    )
  }
}

const Header = (props) => {
    return (
        <Row>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title" style={{ color: '#136034' }}>ID</div>
                    <span>{props.id ?? 0}</span>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title" style={{ color: '#136034' }}>Order</div>
                    <span>{props.orders ?? 0}</span>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title" style={{ color: '#136034' }}>Rating</div>
                    <span>{props.rating ?? 0}</span>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title" style={{ color: '#136034' }}>Status</div>
                    <span style={{ color: props.status === 'active' ? '#28A000':'#D6AB0A' }}>{props.status ?? '-'}</span>
                </div>
            </Col>
        </Row>
    )
}

const SkeletonHeader = (props) => {
    return (
        <Row>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title">
                        <Skeleton.Button active />
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title">
                        <Skeleton.Button active />
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title">
                        <Skeleton.Button active />
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <div className="head-container">
                    <div className="head-title">
                        <Skeleton.Button active />
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const SkeletonComponent = (props) => {
    return (
        <Card title={<SkeletonHeader />} style={{ marginTop: '5px' }}>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
            <div className="info-container">
                <span className="info-value">
                    <Skeleton.Input block active />
                </span>
            </div>
        </Card>
    )
}

export default DriverAddress