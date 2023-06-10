import React from 'react';
import { Card } from 'antd';
import Maps from '../Maps';
import env from "react-dotenv";
class LiveMapTracking extends React.Component {
  render() {
    return (
      <>
        <Card
          style={{
            marginBottom: '25px',
            minHeight: '50vh',
          }}
          title={<span>Live Tracking</span>}
        >
          <Maps lat={env.CENTER_LAT} lng={env.CENTER_LNG} />
        </Card>
      </>
    );
  }
}

export default LiveMapTracking;
