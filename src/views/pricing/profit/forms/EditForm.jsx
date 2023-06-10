import { getServiceType } from '@/api/master/globals'
import { editData } from '@/api/pricing/profit'
import ProfitSharing from '@/components/Form'
import { Form, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'

export default function EditForm(props) {
  const [serviceTypes, setServiceTypes] = useState([]);

  const [formRef] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

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
      formRef.setFieldsValue(props.initValues)
    }
  }, [props.initValues, props.open, formRef])


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
          message: 'Name is required',
        },
      ],
    },
    {
      name: 'isNominal',
      label: 'Type Nominal',
      type: 'select',
      rules: [
        {
          required: true,
        },
      ],
      options: [
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
        },
      ],
    },
    {
      name: 'value',
      label: 'Value',
      placeholder: 'Value',
      rules: [
        {
          required: true,
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
      name: 'isPublish',
      label: 'Publish',
      type: 'select',
      rules: [
        {
          required: true,
        },
      ],
      options: [
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
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

  const handleModal = (close) => {
    if (formRef !== undefined) {
      console.log(close)
      formRef.validateFields()
        .then((values) => {
          values.profitSharingId = props.initValues.profitSharingId
          editData(values).then(results => {
            if (results.data.success) {
              messageApi.open({
                type: 'success',
                content: results.data.message
              })
              setTimeout(() => {
                props.refresh()
                formRef.resetFields()
              }, 1000)
            } else {
              messageApi.open({
                type: 'error',
                content: results.data.message
              })
            }
          }).catch(err => {
            messageApi.open({
              type: 'error',
              content: err.message
            })
          })
            .catch((errorInfo) => {
              console.log(errorInfo);
            });
        });
    }
  };

  return (
    <Modal
      title='EDIT PROFIT'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
      confirmLoading={props.confirmLoading}
      destroyOnClose={true}
    >
      {contextHolder}
      <ProfitSharing formName={props.formName} formLayout={formLayout} formRef={formRef} initValues={props.initValues} validateOnChange={false} inputs={inputs} />
    </Modal>
  );
}
