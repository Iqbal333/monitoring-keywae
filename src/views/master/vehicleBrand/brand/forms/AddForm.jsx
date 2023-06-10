import { getVehicleType } from '@/api/master/globals/vehicleType';
import { addBrand } from '@/api/master/brand';
import BrandVehicle from '@/components/Form';
import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export default function AddForm(props) {
  const [vehicleTypes, setvehicleTypes] = useState([]);
  const [idPreview, setIdPreview] = useState(null);

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

  const initValues = {
    isNominal: false,
    isPublish: false,
  };

  const formLayout = {
    labelCol: {
      sm: { span: 7 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
    enctype: 'multipart/form-data',
  };

  const inputs = [
    {
      name: 'brandName',
      label: 'Brand Name',
      labelCol: { span: 6 },
      placeholder: 'Brand Name',
      rules: [
        {
          required: true,
          message: 'Name is required',
        },
      ],
    },
    {
      name: 'vehicleTypeId',
      label: 'Vehicle type',
      labelCol: { span: 6 },
      placeholder: 'Vehicle type',
      type: 'select',
      rules: [
        {
          required: true,
        },
      ],
      options: vehicleTypes,
    },
    {
      name: 'files',
      key: 'files',
      label: 'Logo',
      type: 'file',
      labelCol: { span: 6 },
      onFileChange: (value) => {
        setIdPreview(URL.createObjectURL(value));
      },
      preview: idPreview,
      rules: [
        {
          required: true,
        },
      ],
    },
  ];

  const handleModal = () => {
    if (formRef !== undefined) {
      formRef
        .validateFields()
        .then((values) => {
          addBrand(values)
            .then((results) => {
              if (results.data.success) {
                props.refresh();
                formRef.resetFields();
              }
            })
            .catch((errorInfo) => {
              console.log(errorInfo);
            });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }
  };

  return (
    <Modal
      title='ADD BRAND'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      <BrandVehicle
        formName={props.formName}
        formLayout={formLayout}
        initValues={initValues}
        formRef={formRef}
        validateOnChange={false}
        inputs={inputs}
      >
        {/* <Form.Item
          name='brandLogo'
          rules={[
            {
              required: true,
              type: 'file',
            },
          ]}
        >
          <Input
            type='file'
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
        </Form.Item> */}
      </BrandVehicle>
      {/* <ProfitSharing>
        <Form.Item name='files'>
          <Upload action={'/local-upload'} method={'POST'} />
        </Form.Item>
      </ProfitSharing> */}
    </Modal>
  );
}
