import { Form, message, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import RegionForm from '@/components/Form'

export default function EditForm(props) {

    const formRef = Form.useForm()

    const [region, setRegion] = useState([])
    const [country, setCountry] = useState([])
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        // getServiceType().then((results) => {
        //     if (results.data.success) {
        //       const filter = results.data.results.map((val) => {
        //         return { value: val.serviceTypeId, label: val.serviceTypeName };
        //       });
        //       setServiceTypes(filter);
        //     }
        //   });
      
          return () => {
            formRef.setFieldsValue(props.initValues)
          }
    },[])

    const inputs = [
      {
        name: 'name',
        label: 'Region Name',
        placeholder: 'Name',
        rules: [
          {
            required: true,
            message: 'Region Name is required',
          },
        ],
      },
      {
        name: 'countryId',
        label: 'Country',
        type: 'select',
        rules: [
          {
            required: true,
          },
        ],
        options: [],
      },
    ];

    const formLayout = {
      labelCol: {
        sm: { span: 7 },
      },
      wrapperCol: {
        sm: { span: 24 },
      },
    };

    const handleModal = (close) => {
      if (formRef !== undefined) {
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
    }

    return (
      <Modal
        title="Edit Region"
        open={props.open}
        onCancel={props.onCancel}
        onOk={handleModal}
        okText="Save"
        destroyOnClose={true}
      >
        {contextHolder}
        <RegionForm formName={'editRegion'} formRef={formRef} validateOnChange={true} formLayout={formLayout} inputs={inputs} />
      </Modal>
    )
}
