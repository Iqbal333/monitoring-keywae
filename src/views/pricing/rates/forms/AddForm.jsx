import { getServiceType } from '@/api/master/globals';
import { addData } from '@/api/pricing/rates';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export default function AddForm(props) {
  const [serviceTypes, setServiceTypes] = useState([]);

  const [formRef] = Form.useForm();

  useEffect(() => {
    getServiceType().then((results) => {
      if (results.data.success) {
        const filter = results.data.results.map((val) => {
          return { value: val.serviceTypeId, label: val.serviceTypeName };
        });
        setServiceTypes(filter);
      }
    });
    return () => {
      return false;
    };
  }, []);

  const initValues = {
    isPartOf: false,
  };

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
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      rules: [
        {
          required: true,
          message: 'Additional Rates Name is required',
        },
      ],
    },
    {
      name: 'serviceTypeId',
      label: 'Service type',
      placeholder: 'Service type',
      type: 'select',
      rules: [
        {
          required: true,
        },
      ],
      options: serviceTypes,
    },
    {
      name: 'minDistance',
      label: 'Min. Distance',
      placeholder: 'Minimum Distance',
      type: 'number',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'startDistance',
      label: 'Start Distance',
      placeholder: 'Start Distance',
      type: 'number',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'endDistance',
      label: 'End Distance',
      placeholder: 'End Distance',
      type: 'number',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'price',
      label: 'Price',
      placeholder: 'Price',
      type: 'number',
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
          addData(values).then((results) => {
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
      title='TAMBAH TARIF'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Add'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      <ProfitSharing
        formName={props.formName}
        formLayout={formLayout}
        initValues={initValues}
        formRef={formRef}
        validateOnChange={false}
        inputs={inputs}
      />
    </Modal>
  );
}
