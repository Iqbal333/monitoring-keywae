import React, { Component } from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { getServiceType as test } from '@/api/master/globals/index';

const { TextArea } = Input;

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceType: [],
    };
  }

  getServiceType = async () => {
    const response = await test();
    const results =
      response.data.results.length > 0 ? response.data.results : [];

    const serviceType = results.map((val) => {
      return { value: val.serviceTypeId, label: val.serviceTypeName };
    });

    this.setState({
      serviceType,
    });
  };

  componentDidMount() {
    this.getServiceType();
  }

  render() {
    const { open, onCancel, onOk, confirmLoading } = this.props;
    const formItemLayout = {
      labelCol: {
        sm: { span: 10 },
      },
      wrapperCol: {
        sm: { span: 24 },
      },
    };

    return (
      <Modal
        title='ADD PROFIT'
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        okText='Save'
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout} layout='vertical'>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'This is a required field!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Type Nominal'
            name='isNominal'
            rules={[
              {
                required: true,
                message: 'This is a required field!',
              },
            ]}
          >
            <Select
              placeholder='Select'
              onChange={''}
              allowClear
              options={[
                {
                  value: 'true',
                  label: 'Yes',
                },
                {
                  value: 'false',
                  label: 'No',
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label='Value'
            name='value'
            rules={[
              {
                required: true,
                message: 'This is a required field!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <TextArea rows={4} placeholder='Please enter description' />
          </Form.Item>
          <Form.Item
            label='Service Type'
            name='serviceTypeId'
            rules={[
              {
                required: true,
                message: 'This is a required field!',
              },
            ]}
          >
            <Select
              placeholder='Select'
              onChange={''}
              allowClear
              options={this.state.serviceType}
            ></Select>
          </Form.Item>
          <Form.Item
            label='Publish'
            name='isPublish'
            rules={[
              {
                required: true,
                message: 'This is a required field!',
              },
            ]}
          >
            <Select
              placeholder='Select'
              onChange={''}
              allowClear
              style={{ width: 200 }}
              options={[
                {
                  value: 'true',
                  label: 'Yes',
                },
                {
                  value: 'false',
                  label: 'No',
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddForm;
