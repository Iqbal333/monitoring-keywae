import { addCategory } from '@/api/auction/auction/addCategory';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';
import React from 'react';
import { message } from 'antd';
import { useState } from 'react';

export default function AddForm(props) {
  const [messageApi, contextHandler] = message.useMessage();
  const [formRef] = Form.useForm();
  const [idPreview, setIdPreview] = useState(null);

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
    enctype: 'multipart/form-data',
  };

  const inputs = [
    {
      name: 'files',
      label: 'Icon',
      placeholder: 'categoryIcon',
      type: 'file',
      labelCol: { span: 6 },
      onFileChange: (value) => {
        setIdPreview(URL.createObjectURL(value));
      },
      preview: idPreview,
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
      name: 'name',
      label: 'Nama Kategori',
      placeholder: 'nama kategori',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
        name: 'value',
        label: 'Value',
        placeholder: 'value',
        rules: [
          {
            required: true,
          },
        ],
      },
    {
      name: 'description',
      label: 'Deskripsi',
      placeholder: 'deskripsi kategori',
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
          addCategory(values)
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: "Berhasil Ditambahkan",
                        duration: 1,
                    });
                    props.refresh();
                    formRef.resetFields();

                } else {
                    messageApi.error({
                    content: results.data.message,
                    duration: 1,
                    });
                }
            })
            .catch((errorInfo) => {
                messageApi.error({
                    content: errorInfo.message,
                    duration: 1,
                });
            });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }
  };

  return (
    <>
        {contextHandler}
        <Modal
        title='Tambah Kategori'
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
    </>
  );
}
