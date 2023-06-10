import {
  addVehicleType,
  getVehicleType as getVehicleTypeReg,
} from '@/api/register';
import { Button, Card, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import FormStep from '@/components/Form';
import { getVehicleType } from '@/api/master/globals/vehicleType';
import { IS_EMPTY_OBJECT } from '@/utils/global';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Step1(props) {
  const [formRef] = useForm();
  const [messageApi, contextHandler] = message.useMessage();

  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    getVehicleType().then((results) => {
      if (results.data.success) {
        setVehicleTypes(results.data.results);
        console.log(results.data.results);
      }
    });

    getVehicleTypeReg().then((results) => {
      if (results.data.success) {
        if (IS_EMPTY_OBJECT(results.data.results) === false) {
          formRef.setFieldsValue(results.data.results);
        }
      }
    });

    return () => {
      return false;
    };
  }, []);

  const inputs = [
    {
      name: 'vehicleTypeId',
      key: 'vehicleTypeId',
      labelCol: { span: 3 },
      type: 'cardselect',
      fieldNames: {
        label: 'vehicleName',
        value: 'vehicleTypeId',
      },
      options: vehicleTypes,
    },
  ];

  const onSubmit = () => {
    formRef.validateFields().then((values) => {
      addVehicleType(values).then((results) => {
        if (results.data.success) {
          messageApi.success({
            content: results.data.message,
            duration: 1,
          });
          props.refresh();
        } else {
          messageApi.error({
            content: results.data.message,
            duration: 1,
          });
        }
      });
    });
  };

  return (
    <Card>
      {contextHandler}
      <FormStep
        formRef={formRef}
        formLayout={{ size: 'middle' }}
        inputs={inputs}
      />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type='primary' onClick={onSubmit}>
          Next
          <ArrowRightOutlined />
        </Button>
      </div>
    </Card>
  );
}
