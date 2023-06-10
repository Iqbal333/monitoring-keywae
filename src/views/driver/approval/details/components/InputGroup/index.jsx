import React from 'react';
import './index.less';

export default function InputGroup(props) {
  return (
    <div className="input-form">
        <span className="input-label">{props.label}</span>
        {props.children}
    </div>
  )
}
