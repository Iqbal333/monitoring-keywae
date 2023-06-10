import { addData } from '@/api/merchant/master/businessPermit';
import BusinessType from '@/components/Form';
import { Form, Modal } from 'antd';
import React from 'react';

export default function AddForm(props) {
  const [formRef] = Form.useForm();

  const initValues = {
    isPartOf: false,
  };

  const formLayout = {
    labelCol: {
      sm: { span: 10 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
  };

  const inputs = [
    {
      name: 'businessPermitTypeName',
      label: 'Business Permit Type Name',
      placeholder: 'BusinessPermit Type Name',
      rules: [
        {
          required: true,
          message: 'Additional BusinessPermit Type Name is required',
        },
      ],
      width: 50,
      align: 'center',
    },
    {
      name: 'businessPermitTypeAlias',
      label: 'Alias',
      placeholder: 'Business Permit Type Alias',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'businessPermitTypeDescription',
      label: 'Description',
      type: 'textarea',
      placeholder: 'business Permit Type Description',
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
          console.log(values);
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
      title='ADD BUSINESS PERMIT TYPE'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Add'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      <BusinessType
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
