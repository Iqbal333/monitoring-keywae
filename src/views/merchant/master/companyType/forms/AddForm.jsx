import { addData } from '@/api/merchant/master/companyType';
import CompanyType from '@/components/Form';
import { Form, Modal } from 'antd';
import React from 'react';

export default function AddForm(props) {
  const [formRef] = Form.useForm();

  const initValues = {
    isPartOf: false,
  };

  const formLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 24 },
    },
  };

  const inputs = [
    {
      name: 'companyTypeName',
      label: 'Bussines Type Name',
      placeholder: 'Business Type Name',
      rules: [
        {
          required: true,
          message: 'Additional Business Type Name is required',
        },
      ],
      width: 50,
      align: 'center',
    },
    {
      name: 'companyTypeAlias',
      label: 'Alias',
      placeholder: 'Business Type Alias',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'companyTypeDescription',
      label: 'Description',
      placeholder: 'company Type Description',
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
      title='ADD BUSINESS TYPE'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Add'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      <CompanyType
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
