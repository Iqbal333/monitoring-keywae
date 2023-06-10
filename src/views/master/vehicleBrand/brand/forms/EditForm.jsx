import { getVehicleType } from '@/api/master/globals/vehicleType';
import { editBrand } from '@/api/master/brand';
import BrandVehicle from '@/components/Form';
import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export default function EditForm(props) {
  const [vehicleTypes, setvehicleTypes] = useState([]);

  const [formRef] = Form.useForm();

  useEffect(() => {
    getVehicleType().then((results) => {
      if (results.data.success) {
        const filter = results.data.results.map((val) => {
          return { value: val.vehicleTypeId, label: val.vehicleName };
        });
        setvehicleTypes(filter);
      }
    });
    return () => {
      return false;
    };
  }, []);

  const formLayout = {
    labelCol: {
      sm: { span: 7 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
  };

  const inputs = [
    {
      name: 'brandName',
      label: 'Brand Name',
      placeholder: 'Brand Name',
      rules: [
        {
          required: true,
          message: 'Brand Name is required',
        },
      ],
    },
    {
      name: 'files',
      label: 'Files',
      placeholder: 'Files',
      type: 'file',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'vehicleTypeId',
      label: 'Vehicle type',
      placeholder: 'Vehicle type',
      type: 'select',
      rules: [
        {
          required: true,
        },
      ],
      options: vehicleTypes,
    },
  ];

  const handleModal = () => {
    if (formRef !== undefined) {
      formRef
        .validateFields()
        .then((values) => {
          values.vehicleTypeId = props.initValues.vehicleTypeId;
          editBrand(values).then((results) => {
            console.log(results);
            if (results.data.success) {
              props.refresh();
              formRef.resetFields();
            }
          });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }
  };

  return (
    <Modal
      title='EDIT BRAND'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
      confirmLoading={props.confirmLoading}
    >
      <BrandVehicle
        formName={props.formName}
        formLayout={formLayout}
        initValues={props.initValues}
        formRef={formRef}
        validateOnChange={false}
        inputs={inputs}
      />
    </Modal>
  );
}
