import { addData } from '@/api/pricing/rates';
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
      name: 'categoryIcon',
      label: 'Icon',
      placeholder: 'categoryIcon',
      type: 'file',
      rules: [
        {
          required: true,
          message: 'Additional Rates Name is required',
        },
      ],
      width: 50,
      align: 'center',
    },
    {
      name: 'categoryName',
      label: 'Name',
      placeholder: 'categoryName',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'categoryDescription',
      label: 'Description',
      placeholder: 'categoryDescription',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'categoryType',
      label: 'Category Type',
      placeholder: 'categoryType',
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
      title='ADD CATEGORY'
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
