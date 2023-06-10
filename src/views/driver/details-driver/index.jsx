import {
  getDetailDriver
} from '@/api/drivers';
import {
  Col,
  Row
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import BioInfo from './components/BioInfo';

export default function DetailsDriver(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props?.match?.params?.id) {
      getDetailDriver(props?.match?.params?.id).then((res) => {
        if (res.data.success) {
          setData(res.data?.results ?? []);
        }
      });
    }
    return () => {
      return false;
    };
  }, [props?.match?.params?.id]);

  return (
    <div className='app-container'>
      <Row gutter={8} style={{ paddingBottom: 10 }}>
        <Col xs={24} md={24}>
          <BioInfo 
            data={data}
            driverId={props?.match?.params?.id}
          />
        </Col>
      </Row>
    </div>
  );
}
