import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CountUp from 'react-countup';
import { Icon } from '@/components/Icon';
import './index.less';
import { getDashboardMaps } from '@/api/drivers';

const PanelGroup = (props) => {

  const [dataList, setDataList] = useState([
    {
      name: 'Driver Available',
      num: 1120,
      icon: 'UsergroupAddOutlined',
      color: '#136034',
    },
    {
      name: 'Driver Unavailable',
      num: 80,
      icon: 'UsergroupDeleteOutlined',
      color: '#ed2c2d',
    },
    {
      name: 'Driver Pickup Order',
      num: 80,
      icon: 'UserOutlined',
      color: '#d6ab0a',
    },
    {
      name: 'Driver Waiting Order',
      num: 80,
      icon: 'UserSwitchOutlined',
      color: '#d6ab0a',
    },
  ])

  useEffect(() => {
    getDashboardMaps('aab59a09-a9d0-1a57-0736-e7057899bc05').then(results => {
      if (results.data.success) {
        let data = results.data.results
        let available = data.reduce((prev, next) => {
          if (next.isAvailable === true) {
            return prev + 1
          }
          return prev
        },0)
        let unavailable = data.reduce((prev, next) => {
          if (next.isAvailable === false) {
            return prev + 1
          }
          return prev
        },0)
        let pickup = data.reduce((prev, next) => {
          if (next.isPickup === true) {
            return prev + 1
          }
          return prev
        },0)
        let dropoff = data.reduce((prev, next) => {
          if (next.isDropoff == true) {
            return prev + 1
          }
          return prev
        },0)

        let datas = [
          {
            ...dataList[0],
            num: available
          },
          {
            ...dataList[1],
            num: unavailable
          },
          {
            ...dataList[2],
            num: pickup
          },
          {
            ...dataList[3],
            num: dropoff
          }
        ]

        setDataList(datas)
      }
    })
  }, [])

  return (
    <div className='panel-group-container'>
      <Row gutter={10} className='panel-group'>
        {dataList.map((value, key) => (
          <Col key={key} lg={6} sm={12} xs={12} className='card-panel-col'>
            <div className='card-panel'>
              <div className='card-panel-icon-wrapper'>
                <Icon
                  className={value.name}
                  style={{ fontSize: 55, color: value.color }}
                  icon={value.icon}
                />
              </div>
              <div className='card-panel-description'>
                <p className='card-panel-text'>{value.name}</p>
                <CountUp end={value.num} start={0} className='card-panel-num' />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
