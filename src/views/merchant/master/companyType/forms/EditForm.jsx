import { editData } from '@/api/merchant/master/companyType';
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
  }, [props.companyTypeId, props.open]);

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
      name: 'companyTypeName',
      label: 'Company Type Name',
      placeholder: 'Company Type Name',
      rules: [
        {
          required: true,
          message: 'Additional Company Type Name is required',
        },
      ],
      width: 50,
      align: 'center',
    },
    {
      name: 'companyTypeAlias',
      label: 'Alias',
      placeholder: 'Company Type Alias',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'companyTypeDescription',
      label: 'Description',
      placeholder: 'Company Type Description',
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
        values.companyTypeId = props.initValues.companyTypeId;
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
      title='EDIT COMPANY TYPE'
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
