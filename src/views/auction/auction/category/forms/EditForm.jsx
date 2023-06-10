import { addCategory } from '@/api/auction/auction/addCategory';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';
import React, { useEffect } from 'react';
import { message } from 'antd';
import { useState } from 'react';
import { editCategory } from '@/api/auction/auction/editCategory';

export default function EditForm(props) {
  const [messageApi, contextHandler] = message.useMessage();
  const [formRef] = Form.useForm();
  const [idPreview, setIdPreview] = useState(null);

  useEffect(() => {
    if (props.initValues) {
        setIdPreview(props.initValues.imageUrl)
        formRef.setFieldsValue(props.initValues);
    }

    return () => {
        return false;
    };
  }, [props.categoryTypeId]);

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
          message: 'Foto Wajib Diisi!',
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
        values.auctionCategoryId = props.initValues.auctionCategoryId
          editCategory(values)
            .then((results) => {
                if (results.data.success) {
                    messageApi.success({
                        content: "Berhasil Diubah",
                        duration: 1,
                    });
                    formRef.resetFields();
                    props.refresh();

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
        title='Ubah Kategori'
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
            initValues={props.initValues}
            formRef={formRef}
            validateOnChange={false}
            inputs={inputs}
        />
        </Modal>
    </>
  );
}
