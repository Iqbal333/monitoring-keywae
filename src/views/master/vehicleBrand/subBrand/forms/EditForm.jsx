import { editSubBrand } from '@/api/master/subBrand';
import ProfitSharing from '@/components/Form';
import { Form, Modal } from 'antd';

export default function AddForm(props) {
  const [formRef] = Form.useForm();

  const initValues = {
    isNominal: false,
    isPublish: false,
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
      name: 'subBrandName',
      label: 'SubBrand Name',
      placeholder: 'SubBrand Name',
      rules: [
        {
          required: true,
          message: 'Name is required',
        },
      ],
    },
  ];

  const handleModal = () => {
    if (formRef !== undefined) {
      formRef
        .validateFields()
        .then((values) => {
          values.brandId = props.brandId;
          values.subBrandId = props.initValues.subBrandId;
          editSubBrand(values).then((results) => {
            console.log(results);
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
      title='EDIT SUB-BRAND'
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleModal}
      okText='Save'
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
