import React, { useState } from 'react';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';
import { Checkbox } from 'antd';
import { updateAuction } from '@/api/auction/auction/updateAuction';
import { message } from 'antd';

export default function AddForm(props) {
  const [check, setCheck] = useState(false);
  const [hideModal, setHideModal] = useState();
  const [formRef] = Form.useForm();
  const [messageApi, contextHandler] = message.useMessage();

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
      name: 'estimationAmount',
      label: 'Jumlah Estimasi',
      placeholder: 'Rp',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
        name: 'deposit',
        label: 'Deposti',
        placeholder: 'Rp',
        rules: [
          {
            required: true,
          },
        ],
      },
    {
      name: 'depositEnd',
      label: 'Akhir Deposit',
      placeholder: 'dd/mm/yyyy',
      type: 'datepicker',
      rules: [
        {
          required: true,
        },
      ],
    },
    {
        name: 'startWithEndDate',
        label: 'Mulai - Berakhir',
        placeholder: 'dd/mm/yyyy',
        type: 'datepicker-range',
        rules: [
          {
            required: true,
          },
        ],
    },
  ];

  const handleModal = () => {

    if ( check === false) {
        messageApi.error({
            content: "Pastikan Semua Sudah Terisi Dan Kotak Setujui Di Centang",
            duration: 2,
        });
    } else {
        if (formRef !== undefined) {
          formRef
            .validateFields()
            .then((values) => {
                let getAuctionStartDate = values.startWithEndDate[0];
                let getAuctionEndDate = values.startWithEndDate[1];
    
                let auctionStartDate = getAuctionStartDate.format('YYYY-MM-DD');
                let auctionEndDate = getAuctionEndDate.format('YYYY-MM-DD');
    
                let depositEndDate = values.depositEnd.format('YYYY-MM-DD');
    
                let dataPayload = {
                    "auctionId" : props.auctionId,
                    "auctionStartDate" : auctionStartDate,
                    "auctionEndDate" : auctionEndDate,
                    "estimationBid": values.estimationAmount,
                    "openingBid" : values.deposit,
                    "depositEndDate" : depositEndDate,
                    "isApprove" : check
                };
    
                updateAuction(dataPayload).then((results) => {
                    if (results.data.success) {
                        messageApi.success({
                            content: results.data.message,
                            duration: 1,
                        });
                        props.refresh();
                        formRef.resetFields();
                        setTimeout(() => {
                            window.history.back()
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
                messageApi.error({
                    content: errorInfo.message,
                    duration: 1,
                });
            });
        }
    }

  };
  
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  
  return (
    <>
    
        {contextHandler}
        <Modal
        title='Tentukan Estimasi'
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
        <Checkbox onChange={onChange}> <span style={{fontWeight: '600'}}>Setujui</span> (Dengan mencentang kotak ini Anda setuju semua data adalah benar dan bertanggung jawab!)</Checkbox>
        </Modal>
    </>
  );
}
