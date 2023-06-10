import React from 'react'
import Maps from '@/components/Maps'
import { Card, Divider, Image, Modal } from 'antd';
import Logo from '@/assets/images/logo.png';
import { toRupiah } from '@/utils';
import moment from 'moment';
import '@/assets/css/style.css';

export default function index(props) {

    let imageWidth = ((window.screen.width / 2) * 236) / window.screen.width
    let imageHeight = ((window.screen.height / 2) * 118) / window.screen.height
  
    return (
      <Modal
          open={props.open}
          title='Detail Transaction'
          onCancel={props.onCancel}
          destroyOnClose={true}
          onOk={props.onOk}
          width={1200}
          okButtonProps={''}
          confirmLoading={props.confirmLoading}
        >
          <Card title={<Headers image={Logo} imageWidth={imageWidth} imageHeight={imageHeight} status={'Selesai'} time={props.data?.orderDateUnix} orderNo={props.data?.orderNo} />}>
            <div className="customer-details">
              <span className="customer-name">{props.data?.customers?.fullName}</span>
              <span className="customer-email">{props.data?.customers?.email}</span>
              <span className="customer-phoneNumber">{props.data?.customers?.phoneNumber}</span>
            </div>
            <Divider />
            <div className="billing-details">
              <div className="billing-child">
                <span className="billing-label">Sub Total</span>
                <span className="billing-sub-total">{toRupiah(props.data?.subTotal)}</span>
              </div>
              
              <div className="billing-child">
                <span className="billing-label">App Charge</span>
                <span className="billing-app">{toRupiah(props.data?.appCharge)}</span>
              </div>
              
              <div className="billing-child">
                <span className="billing-label">Discount</span>
                <span className="billing-discount">{toRupiah(props.data?.discount)}</span>
              </div>
              
              <div className="billing-child">
                <span className="billing-label">Total</span>
                <span className="billing-total">{toRupiah(props.data?.totalPrice)}</span>
              </div>
            </div>
            <Divider />
            <h5 className="head-title">Detail Perjalanan</h5>
            <div className="pin-container">
                <Maps lat={props.data?.pickupPoint.lat} lng={props.data?.dropoffPoint.lon} markers={[{ ...props.data?.pickupPoint, label: props.data?.pickupLabel }, { ...props.data?.dropoffPoint, label: props.data?.dropoffLabel }]} />
            </div>
          </Card>
        </Modal>
    )
}

const Headers = ({ image, status, time, imageWidth, imageHeight, orderNo }) => {
    return (
      <div className="header-container">
        <div className="header-left">
          <Image src={image} className="header-left-image" width={imageWidth} height={imageHeight} />
          <span className="header-left-child">{status}</span>
        </div>
        <div className="header-right">
          <span className="header-right-child">{moment.unix(time ?? new Date()).format('DD MMMM YYYY HH:mm:ss')}</span>
          <span className="header-right-child">Order {orderNo}</span>
        </div>
      </div>
    )
  }