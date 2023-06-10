import React from 'react'
import Maps from '@/components/Maps'
import { Card, Divider, Image, Tag } from 'antd';
import Logo from '@/assets/images/logo.png';
import { toRupiah } from '@/utils';
import moment from 'moment';
import '@/assets/css/style.css';
import { detailIncome } from '@/api/transactions';
import { Component } from 'react';
import noImage from '@/assets/images/no-image.png'

export class IncomeDetails extends Component {

    constructor(props) {
        super(props)

        this.imageWidth = ((window.screen.width / 2) * 236) / window.screen.width
        this.imageHeight = ((window.screen.height / 2) * 118) / window.screen.height

        this.state = {
            data: {},
            loading: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.setState({ loading: true })
        detailIncome(this.props?.match?.params?.orderId)
            .then((res) => {
                this.setState({ loading: false })
                if (res.data.success) {
                    this.setState({
                        data: res.data.results
                    })
                }
            })
    }

    render() {
        return (
            <div className='app-container'>
                <Card  title={<Headers image={Logo} imageWidth={this.imageWidth} imageHeight={this.imageHeight} status={'Selesai'} time={this.state.data?.orderDateUnix} orderNo={this.state.data?.orderNo} />}>
                    <div className="detail">
                        <div className="customer-details">
                            <h4 className="head-title">Customer</h4>
                            <Image src={this.state.data?.customers?.imageUrl ? this.state.data?.customers?.imageUrl:noImage} width={80} />
                            <span className="customer-name">{this.state.data?.customers?.fullName}</span>
                            <span className="customer-email">{this.state.data?.customers?.email}</span>
                            <span className="customer-phoneNumber">{this.state.data?.customers?.phoneNumber}</span>
                        </div>
                        <div className="driver-details">
                            <h4 className="head-title">Driver</h4>
                            <Image src={this.state.data?.drivers?.driverImageUrl ? this.state.data?.drivers?.driverImageUrl:noImage} width={80} />
                            <span className="driver-name">{this.state.data?.drivers?.driverName}</span>
                            <span className="driver-email">{this.state.data?.drivers?.vehicleBrand} - {this.state.data?.drivers?.vehicleSubBrand}</span>
                            <span className="driver-phoneNumber">{this.state.data?.drivers?.vehiclePlateNumber}</span>
                        </div>
                    </div>
                    <Divider />
                    <div className="billing-details">
                        <div className="billing-child">
                            <span className="billing-label">Sub Total</span>
                            <span className="billing-sub-total">{toRupiah(this.state.data?.subTotal)}</span>
                        </div>

                        <div className="billing-child">
                            <span className="billing-label">App Charge</span>
                            <span className="billing-app">{toRupiah(this.state.data?.appCharge)}</span>
                        </div>

                        <div className="billing-child">
                            <span className="billing-label">Discount</span>
                            <span className="billing-discount">{toRupiah(this.state.data?.discount)}</span>
                        </div>

                        <div className="billing-child">
                            <span className="billing-label">Total</span>
                            <span className="billing-total">{toRupiah(this.state.data?.totalPrice)}</span>
                        </div>
                    </div>
                    <Divider />
                    <h5 className="head-title">Detail Perjalanan</h5>
                    <div className="billing-details">
                        <div className="billing-child">
                            <span className="billing-label">Service Type</span>
                            <span className="billing-sub-total">
                                <Image src={this.state.data?.serviceTypes?.serviceTypeImage ?? noImage} width={20} preview={false} /> &nbsp;
                                {this.state.data?.serviceTypes?.serviceTypeName}
                            </span>
                        </div>
                        <div className="billing-child">
                            <span className="billing-label">Payment Method</span>
                            <span className="billing-sub-total">
                                <Image src={this.state.data?.paymentMethods?.paymentMethodImage ?? noImage} width={20} preview={false} /> &nbsp;
                                {this.state.data?.paymentMethods?.paymentMethodAlias} ({this.state.data?.paymentMethods?.paymentMethodName})
                            </span>
                        </div>
                        <div className="billing-child">
                            <span className="billing-label">Distance</span>
                            <span className="billing-sub-total">{this.state.data?.distance}</span>
                        </div>
                    </div>
                    <div className="detail" style={{ marginBottom: 20 }}>
                        <div className="customer-details" style={{ flex: 1 }}>
                            <h4 className="head-title">Pick Up</h4>
                            <span className="customer-name">{this.state.data?.pickupLabel}</span>
                            <span className="customer-email">{this.state.data?.pickupLocation}</span>
                        </div>
                        <div className="driver-details" style={{ flex: 1 }}>
                            <h4 className="head-title">Drop Off</h4>
                            <span className="driver-name">{this.state.data?.dropoffLabel}</span>
                            <span className="driver-email">{this.state.data?.dropoffLocation}</span>
                        </div>
                    </div>
                    <div className="pin-container">
                        <Maps lat={this.state.data?.pickupPoint?.lat} lng={this.state.data?.dropoffPoint?.lon} markers={[{ ...this.state.data?.pickupPoint, label: this.state.data?.pickupLabel }, { ...this.state.data?.dropoffPoint, label: this.state.data?.dropoffLabel }]} />
                    </div>
                </Card>
            </div>
        )
    }
}

export default IncomeDetails

const Headers = ({ image, status, time, imageWidth, imageHeight, orderNo }) => {
    return (
      <div className="header-container">
        <div className="header-left">
          <Image src={image} className="header-left-image" width={imageWidth} preview={false} height={imageHeight} />
          {status?.toLowerCase() === 'selesai' ? (
            <Tag color="success" style={{ width: 'min-content' }}>{status}</Tag>
          ):(
            <Tag color="default" style={{ width: 'min-content' }}>{status}</Tag>
          )}
        </div>
        <div className="header-right">
          <span className="header-right-child">{moment.unix(time ?? new Date()).format('DD MMMM YYYY HH:mm:ss')}</span>
          <span className="header-right-child-bold">Order {orderNo}</span>
        </div>
      </div>
    )
  }