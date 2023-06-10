import React from 'react';
import { Row, Col } from 'antd';
import CountUp from 'react-countup';
import { Icon } from '@/components/Icon';
import './index.less';

const chartList = [
  {
    type: 'Revenue',
    num: 1102400,
    icon: 'WalletOutlined',
    color: '#40c9c6',
  },
  {
    type: 'Messages',
    num: 81212,
    icon: 'WalletOutlined',
    color: '#36a3f7',
  },
  {
    type: 'Purchases',
    num: 9280,
    color: '#f4516c',
  },
  {
    type: 'Shoppings',
    num: 13600,
    color: '#f6ab40',
  },
];

const PanelGroup = (props) => {
  const { handleSetLineChartData } = props;
  return (
    <div className='panel-group-container'>
      <Row gutter={40} className='panel-group'>
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            onClick={handleSetLineChartData.bind(this, chart.type)}
            className='card-panel-col'
          >
            <div className='card-panel'>
              <div className='card-panel-icon-wrapper'>
                <Icon
                  className={chart.type}
                  style={{ fontSize: 55, color: chart.color }}
                  icon={chart.icon}
                />
              </div>
              <div className='card-panel-description'>
                <p className='card-panel-text'>{chart.type}</p>
                <CountUp end={chart.num} start={0} className='card-panel-num' />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
