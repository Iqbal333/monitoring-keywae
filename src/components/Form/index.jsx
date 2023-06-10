import CardSelect from '@/views/driver/register/components/card-select';
import FileInput from '@/views/driver/register/components/input';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TimePicker,
} from 'antd';
import React from 'react';

export default function GlobalForm(props) {
  return (
    <Form
      form={props.formRef}
      name={props.formName}
      initialValues={props.initValues}
      validateMessages={props.validateMessages}
      onValuesChange={props.validateOnChange}
      onFinish={props.onFinish}
      {...props.formLayout}
    >
      {props?.inputs?.map((val, idx) => (
        <InputType {...val} key={idx} />
      ))}
      {props.children}
    </Form>
  );
}

const InputType = (props) => {
  switch (props.type) {
    case 'radio':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='checked'
        >
          <Radio.Group value={props.value}>
            {props?.child?.map((val, idx) => (
              <Radio key={idx} value={val.value}>
                {val.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      );

    case 'checkbox':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <Checkbox.Group value={props.value}>
            {props?.child?.map((val, idx) => (
              <Checkbox key={idx} value={val.value}>
                {val.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      );

    case 'select':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <Select
            placeholder={props.placeholder}
            {...props}
            allowClear
            options={props.options}
          />
        </Form.Item>
      );

    case 'textarea':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <Input.TextArea
            placeholder={props.placeholder}
            cols={props.cols}
            rows={props.rows}
          />
        </Form.Item>
      );

    case 'datepicker':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <DatePicker
            showTime={props.showTime ?? false}
            onChange={props.onChange}
          />
        </Form.Item>
      );

    case 'datepicker-range':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <DatePicker.RangePicker
            showTime={props.showTime ?? false}
            onChange={props.onChange}
          />
        </Form.Item>
      );

    case 'timepicker':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <TimePicker onChange={props.onChange} format={props.format} />
        </Form.Item>
      );

    case 'file':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
        >
          <FileInput
            onChange={props.onFileChange}
            preview={props.preview}
            accept={props.accept}
          />
        </Form.Item>
      );

    case 'cardselect':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
        >
          <CardSelect {...props} />
        </Form.Item>
      );

    case 'password':
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <Input.Password {...props} placeholder={props.placeholder} />
        </Form.Item>
      );

    default:
      return (
        <Form.Item
          extra={props.extra}
          label={props.label}
          {...props}
          name={props.name}
          rules={props.rules}
          valuePropName='value'
        >
          <Input {...props} placeholder={props.placeholder} />
        </Form.Item>
      );
  }
};
