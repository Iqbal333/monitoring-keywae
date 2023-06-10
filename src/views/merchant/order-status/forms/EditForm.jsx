import { editData } from '@/api/merchant/order';
import OrderStatus from '@/components/Form';
import { Form, Modal, message } from 'antd';
import React, { useEffect } from 'react';

export default function EditForm(props) {
  const [formRef] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    return () => {
      formRef.setFieldsValue(props.initValues);
    };
  }, [props.orderStatusId, props.open]);

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

  const handleModal = (close) => {
    if (formRef !== undefined) {
      console.log(close);
      formRef.validateFields().then((values) => {
        values.orderStatusId = props.initValues.orderStatusId;
        console.log(values);
        editData(values)
          .then((results) => {
            if (results.data.success) {
              messageApi.open({
                type: 'success',
                content: results.data.message,
              });
              setTimeout(() => {
                props.refresh();
                formRef.resetFields();
              }, 1000);
            } else {
              messageApi.open({
                type: 'error',
                content: results.data.message,
              });
            }
          })
          .catch((err) => {
            messageApi.open({
              type: 'error',
              content: err.message,
            });
          })
          .catch((errorInfo) => {
            console.log(errorInfo);
          });
      });
    }
  };

  return (
    <Modal
      title='EDIT ORDER STATUS'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      {contextHolder}
      <OrderStatus
        formName={props.formName}
        formLayout={formLayout}
        formRef={formRef}
        initValues={props.initValues}
        validateOnChange={false}
        inputs={inputs}
      />
    </Modal>
  );
}
