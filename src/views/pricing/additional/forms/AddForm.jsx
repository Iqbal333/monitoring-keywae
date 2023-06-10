import { getServiceType } from '@/api/master/globals';
import { addData } from '@/api/pricing/additional';
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
      sm: { span: 9 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
  };

  const inputs = [
    {
      name: 'additionalPriceName',
      label: 'Additional Price Name',
      placeholder: 'additional Price Name',
      rules: [
        {
          required: true,
          message: 'Additional Price Name is required',
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
      name: 'additionalPrice',
      label: 'Additional Price',
      placeholder: 'Additional Price',
      type: 'number',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'isPartOf',
      label: 'Part of',
      type: 'select',
      rules: [
        {
          required: true,
        },
        {
          type: 'boolean',
        },
      ],
      options: [
        {
          value: true,
          label: 'Nominal',
        },
        {
          value: false,
          label: 'Percentage',
        },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 5,
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
      title='ADD ADDITIONAL PRICE'
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
