import { addData } from '@/api/merchant/order';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';
import React from 'react';

export default function AddForm(props) {
  const [formRef] = Form.useForm();

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
      label: 'Status Name',
      placeholder: 'status name',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      placeholder: 'description',
      type: 'textarea',
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
      title='ADD ORDER STATUS'
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
