import { reqCheckEmail, reqCheckPhone, reqLogin } from '@/api/auth';
import { registerAuth } from '@/api/register';
import RegisterAccountForm from '@/components/Form';
import { setTokenRegister } from '@/utils/token';
import { Button, Card, message } from 'antd';
import { useForm } from 'antd/es/form/Form';

export default function Initial(props) {
  const [formRef] = useForm();
  const [messageApi, contextHandler] = message.useMessage();

  const onSubmit = () => {
    formRef.validateFields().then(async (values) => {
      let temp = '';

      const checkEmail = await reqCheckEmail(values.email);

      if (checkEmail.data?.success) {
        if (checkEmail.data?.results?.length > 0) {
          if (checkEmail.data?.results?.driverId != null) {
            console.log(
              checkEmail.data?.results[0]?.driverId,
              checkEmail.data?.results?.driverId != null
            );
            messageApi.error({
              content: 'Email sudah terdaftar',
              duration: 1,
            });
            return;
          }
        }
      }

      if (!/^62|^\+62/.exec(values.phoneNumber)) {
        temp = values.phoneNumber.replace(/^62|^\+62/, '0');
      } else {
        temp = values.phoneNumber;
      }

      const checkPhone = await reqCheckPhone(temp);

      if (checkPhone.data?.success) {
        console.log(checkPhone.data);
        if (checkPhone.data?.results?.length > 0) {
          if (checkPhone.data?.results[0]?.driverId != null) {
            messageApi.error({
              content: 'Nomor Telepon sudah terdaftar',
              duration: 1,
            });
            return;
          }
        }
      }

      if (
        (checkEmail.data.success &&
          checkEmail.data?.results?.length > 0 &&
          checkEmail.data?.results[0]?.driverId === null) ||
        (checkPhone.data.success &&
          checkPhone.data?.results?.length > 0 &&
          checkPhone.data?.results[0]?.driverId === null)
      ) {
        reqLogin({
          account: values.email,
          password: values.password,
        })
          .then((results) => {
            if (results.data.success) {
              setTokenRegister(results.data.token);
              messageApi.success({
                content: 'Berhasil',
                duration: 1,
              });
              props.refresh();
            } else {
              messageApi.error({
                content: results.data.message,
                duration: 1,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
        return;
      } else {
        registerAuth(values)
          .then((response) => {
            if (response.data.success) {
              // Login
              reqLogin({
                account: values.email,
                password: values.password,
              })
                .then((results) => {
                  if (results.data.success) {
                    setTokenRegister(results.data.token);
                    messageApi.success({
                      content: 'Berhasil',
                      duration: 1,
                    });
                    props.refresh();
                  } else {
                    messageApi.error({
                      content: results.data.message,
                      duration: 1,
                    });
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              messageApi.error({
                content: response.data.message,
                duration: 1,
              });
            }
          })
          .catch((err) => {
            console.error('REGISTER', err);
            messageApi.error({
              content: err.message,
              duration: 1,
            });
          });
      }

      // if ((checkEmail.data?.success && checkEmail.data?.results?.length === 0) && (checkPhone.data?.success && checkPhone.data?.results?.length === 0)) {
      //     // Register
      // } else {
      //     messageApi.error({
      //         content: 'Terjadi kesalahan, silahkan coba lagi nanti.',
      //         duration: 1
      //     })
      // }
    });
  };

  const validatePhone = async (_, value) => {
    if (!isNaN(parseInt(value))) {
      return Promise.resolve(value);
    }
    return Promise.reject(new Error('Invalid Phone Number'));
  };

  const inputs = [
    {
      name: 'fullName',
      key: 'fullName',
      placeholder: 'Nama Lengkap',
      label: 'Nama Lengkap',
      labelCol: { span: 4 },
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: 'email',
      key: 'email',
      placeholder: 'Email',
      label: 'Email',
      labelCol: { span: 4 },
      rules: [
        {
          required: true,
          type: 'email',
        },
      ],
    },
    {
      name: 'phoneNumber',
      key: 'phoneNumber',
      placeholder: 'Nomor Telepon',
      label: 'Nomor Telepon',
      labelCol: { span: 4 },
      rules: [
        {
          required: true,
          validator: validatePhone,
        },
      ],
    },
    {
      name: 'password',
      key: 'password',
      placeholder: 'Kata Sandi',
      label: 'Kata Sandi',
      labelCol: { span: 4 },
      type: 'password',
      rules: [
        {
          required: true,
          min: 6,
        },
      ],
    },
  ];

  return (
    <Card>
      {contextHandler}
      <RegisterAccountForm
        formLayout={{ size: 'middle' }}
        formRef={formRef}
        inputs={inputs}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='primary' size='middle' onClick={onSubmit}>
          Next
        </Button>
      </div>
    </Card>
  );
}
