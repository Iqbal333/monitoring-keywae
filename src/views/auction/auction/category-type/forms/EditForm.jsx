import { category } from '@/api/auction/auction/category';
import { getServiceType } from '@/api/master/globals';
import { addData } from '@/api/pricing/rates';
import ProfitSharing from '@/components/Form';
import { Form, Modal, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { message } from 'antd';
import { addCategoryType } from '@/api/auction/auction/addCategoryType';

export default function EditForm(props) {
  const [messageApi, contextHandler] = message.useMessage();
  const [formRef] = Form.useForm();
  const [ allCategory, setAllCategory ] = useState("");
  const [ aucCateId, setAucCateId ] = useState("");

  useEffect(() => {
    category()
        .then((res) => {
            if(res.data.success) {
                const allDataCategory = res.data.results.map((data) => {
                    return{
                        value: data.auctionCategoryId,
                        label: data.name
                    }
                });
                setAllCategory(allDataCategory)
            }
        })
        .catch((err) => console.log(err))

    if (props.initValues) {
        formRef.setFieldsValue(props.initValues);
    }

    return () => {
        return false;
    };
  }, [props.categoryTypeId])

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
        label: 'Nama Sub Kategori',
        placeholder: 'masukkan sub kategori',
        rules: [
          {
            required: true,
          },
        ],
      },
    {
        name: 'value',
        label: 'Value Sub Kategori',
        placeholder: 'masukkan sub value',
        rules: [
          {
            required: true,
          },
        ],
      },
  ];

  const handleModal = () => {
    if(aucCateId === '') {
        if(props.initValues !== '') {
            setAucCateId(props.initValues.auctionCategoryId)
        } else {
            messageApi.error({
                content: "Semua Form Wajib Diisi",
                duration: 1,
            });
        }
    } else {
        if (formRef !== undefined) {
          formRef
            .validateFields()
            .then((values) => {
              addCategoryType({
                "auctionCategoryId": aucCateId,
                "auctionTypeId": props.initValues.auctionTypeId,
                "name": values.name,
                "value": values.value,
              }).then((results) => {
                if (results.data.success) {
                  messageApi.success({
                        content: "Berhasil Diubah",
                        duration: 1,
                    });
                    // formRef.resetFields();
                    setTimeout(() => {
                        props.refresh();
                    }, 1200)

                } else {
                    messageApi.error({
                    content: results.data.message,
                    duration: 1,
                    });
                }
              });
            })
            .catch((errorInfo) => {
              console.log(errorInfo);
            });
        }
    }
  };

  const onChange = (value) => {
    setAucCateId(value);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <>
        {contextHandler}
        <Modal
        title='Ubah Sub Kategori'
        open={props.open}
        onCancel={props.onCancel}
        onOk={handleModal}
        okText='Add'
        confirmLoading={props.confirmLoading}
        destroyOnClose={true}
        >
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <p style={{marginRight: '5px'}}> <span style={{color: 'red'}}>*</span> Kategori:</p>
                <Select
                    showSearch
                    placeholder="Pilih Kategori"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    style={{width: '335px'}}
                    defaultValue={props.initValues.auctionCategoryId}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={allCategory}
                />
            </div>
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
