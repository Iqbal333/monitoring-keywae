import { Button } from 'antd'
import React, { Component } from 'react'
import DriverDashboard from './Driver';
import ShopDashboard from './Shop';
import AuctionDashboard from './Auction';

export default class index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tabs: 'keyride'
    }
  }

  render() {
    return (
      <>
        <div className='app-col-button-tabs'>
          <Button style={{ display: "none" }} type={this.state.tabs==='keyride' ? 'primary':'default'} onClick={() => this.setState({ tabs: 'keyride' })}>
            KeyRide
          </Button>
          <Button style={{ display: "none" }} type={this.state.tabs==='keyfood' ? 'primary':'default'} onClick={() => this.setState({ tabs: 'keyfood' })}>
            KeyFood
          </Button>
          <Button style={{ display: "none" }} type={this.state.tabs==='keylang' ? 'primary':'default'} onClick={() => this.setState({ tabs: 'keylang' })}>
            KeyLang
          </Button>
          <Button style={{ display: "none" }} type={this.state.tabs==='keyshop' ? 'primary':'default'} onClick={() => this.setState({ tabs: 'keyshop' })}>
            KeyShop
          </Button>
        </div>
        <div className='app-container'>
          <TabContents tab={this.state.tabs} />
        </div>
      </>
    )
  }
}

const TabContents = (props) => {
  switch (props.tab) {
    case 'keyride':
      return <DriverDashboard />

    case 'keyfood':
      return <ShopDashboard />

    case 'keylang':
      return <AuctionDashboard />

    case 'keyshop':
      return <ShopDashboard />
  
    default:
      return <></>
  }
}