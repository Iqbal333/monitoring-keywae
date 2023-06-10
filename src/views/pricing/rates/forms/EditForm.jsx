import { getServiceType } from '@/api/master/globals';
import { editData } from '@/api/pricing/rates';
import ProfitSharing from '@/components/Form';
import { Form, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';

export default function EditForm(props) {
  const [serviceTypes, setServiceTypes] = useState([]);

  const [formRef] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

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
      formRef.setFieldsValue(props.initValues);
    };
  }, [props.priceId, props.open]);

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

  const handleModal = (close) => {
    if (formRef !== undefined) {
      console.log(close);
      formRef.validateFields().then((values) => {
        values.priceId = props.initValues.priceId;
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
      title='EDIT RATES'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      {contextHolder}
      <ProfitSharing
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
