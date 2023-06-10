import { Modal } from 'antd'
import React, { Component } from 'react'

export const Prompt = (props) => {
    return (
        <Modal open={props.open} title={props.title} onCancel={props.onCancel} onOk={props.onAccept}>
            <p>{props.description}</p>
        </Modal>
    )
}

export default Prompt