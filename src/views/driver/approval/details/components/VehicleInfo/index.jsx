import { Button, Card, Col, Input, Row, Select, message } from 'antd';
import React from 'react';
import InputGroup from '../InputGroup';
import UpdateForm from '@/components/Form';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBrand } from '@/api/master/brand';
import { getVehicleType } from '@/api/master/globals/vehicleType';
import { getYearMake } from '@/utils/global';
import { options } from 'less';
import { updatedVehicles } from '@/api/drivers';
import { getSubBrand } from '@/api/master/subBrand';

export default function VehicleInfo(props) {
  const [formRef] = useForm();
  const [messageApi, contextHandler] = message.useMessage();

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [driverId, setDriverId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [subBrandId, setSubBrandId] = useState('');
  const [brands, setBrands] = useState([]);
  const [subBrands, setSubBrands] = useState([]);
  const [yearMakes, setYearMakes] = useState([]);

  useEffect(() => {
    getVehicleType().then((res) => {
      if (res.data.success) {
        setVehicleTypes(res.data.results);
      }
    });

    getBrand().then((res) => {
      if (res.data.success) {
        setBrands(res.data.results);
      }
    });

    setYearMakes(getYearMake());

    if (props?.data) {
      setDriverId(props?.driverId);
      setBrandId(props?.data?.brandId);
      formRef.setFieldsValue(props.data);
    }
  }, []);

  useEffect(() => {
    if (brandId) {
      getSubBrand(brandId).then((res) => {
        if (res.data.success) {
          setSubBrands(res.data.results);
        }
      });
    }
  }, [brandId]);

  const inputs = [
    {
      name: 'vehicleTypeId',
      key: 'vehicleTypeId',
      label: 'Jenis Kendaraan',
      type: 'select',
      fieldNames: {
        label: 'vehicleTypeName',
        value: 'vehicleTypeId',
      },
      options: vehicleTypes,
      rules: [
        {
          required: true,
        },
      ],
      labelCol: { span: 6 },
    },
    {
      name: 'brandId',
      key: 'brandId',
      label: 'Merek Kendaraan',
      type: 'select',
      fieldNames: {
        label: 'brandName',
        value: 'brandId',
      },
      onChange: (value) => {
        setBrandId(value);
      },
      options: brands,
      rules: [
        {
          required: true,
        },
      ],
      labelCol: { span: 6 },
    },
    {
      name: 'subBrandId',
      key: 'subBrandId',
      label: 'Tipe Merek',
      type: 'select',
      fieldNames: {
        label: 'subBrandName',
        value: 'subBrandId',
      },
      options: subBrands,
      rules: [
        {
          required: true,
        },
      ],
      labelCol: { span: 6 },
    },
    {
      name: 'plateNumber',
      key: 'plateNumber',
      label: 'Plat Nomor',
      rules: [
        {
          required: true,
        },
      ],
      labelCol: { span: 6 },
    },
    {
      name: 'yearMake',
      key: 'yearMake',
      label: 'Tahun Pembuatan',
      type: 'select',
      options: yearMakes,
      rules: [
        {
          required: true,
        },
      ],
      labelCol: { span: 6 },
    },
  ];

  const onSubmit = () => {
    formRef
      .validateFields()
      .then((values) => {
        values.driverId = driverId;
        updatedVehicles(values)
          .then((res) => {
            if (res.data.success) {
              messageApi.success({
                content: res.data.message,
                duration: 1,
              });
            } else {
              messageApi.error({
                content: res.data.message,
                duration: 1,
              });
            }
          })
          .catch((err) => {
            messageApi.error({
              content: err.message,
              duration: 1,
            });
          });
      })
      .catch((err) => {
        messageApi.error({
          content: err.message,
          duration: 1,
        });
      });
  };

  return (
    <Card>
      {contextHandler}
      <UpdateForm formRef={formRef} inputs={inputs}>
        <Button
          type='primary'
          style={{ alignItems: 'flex-end' }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </UpdateForm>
    </Card>
  );
}
