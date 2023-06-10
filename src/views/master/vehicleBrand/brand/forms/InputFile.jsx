import { Input } from 'antd';
import React from 'react';

export default function InputFile({ onChange, value }) {
  const changeValue = (e) => {
    onChange?.({
      uri: e.target.value,
      ...e.target.files,
    });
  };

  return <Input type='file' onChange={changeValue} value={value} />;
}
