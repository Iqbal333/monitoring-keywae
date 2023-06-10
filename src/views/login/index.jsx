import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login, getUserInfo } from '@/store/actions';

import './index.less';

const Login = (props) => {
  const { login, token, getUserInfo } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleLogin = (account, password) => {
    setLoading(true);
    login(account, password)
      .then((data) => {
        handleUserInfo(data.token);
        messageApi.open({
          type: 'success',
          content: 'Successful Authentication, Please Wait...',
        });
      })
      .catch((error) => {
        setLoading(false);
        messageApi.open({
          type: 'error',
          content: error,
        });
      });
  };

  //get data user token
  const handleUserInfo = (token) => {
    //console.log(token)
    getUserInfo(token)
      .then((data) => {
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error,
        });
      });
  };

  const handleSubmit = (values) => {
    const { account, password } = values;
    handleLogin(account, password);
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      {contextHolder}
      <div className='bg-login'>
        <Form
          className='content'
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <div className='title'>
            <h2>Login</h2>
            <p>Please log in with your email or username and password.</p>
          </div>
          <Spin spinning={loading} tip='Loading...'>
            <Form.Item
              name='account'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username or Email!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username or Email'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Log in
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </>
  );
};

// const WrapLogin = Form.useForm()(Login);
export default connect((state) => state.user, { login, getUserInfo })(Login);
