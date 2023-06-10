import React from 'react';
import { Row, Col } from 'antd';
import PanelGroup from './components/PanelGroup';
import LiveMapTracking from './components/LiveMapTracking';
import TransactionTable from './components/TransactionTable';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import './index.less';

const Tracking = () => {
  return (
    <div className='app-container'>
      <PanelGroup />
      <LiveMapTracking />
      <Row gutter={8}>
        <Col
          style={{ paddingRight: '8px', marginBottom: '30px' }}
        >
          <TransactionTable />
        </Col>
        {/* <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          style={{ paddingRight: '8px', marginBottom: '30px' }}
        >
          <div className='chart-wrapper'>
            <PieChart />
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          style={{ paddingRight: '8px', marginBottom: '30px' }}
        >
          <div className='chart-wrapper'>
            <BarChart />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default Tracking;
