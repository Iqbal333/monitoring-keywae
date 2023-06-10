import { getInterviewEdit, sendEmail, checkSendEmail } from '@/api/interview'
import Prompt from '@/components/Modal'
import { EnvironmentOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import React, { Component } from 'react'
import ListDriver from './components/ListDriver'
import './index.less'

export class InterviewsDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {},
            showPrompt: false,
            loading: false,
            promptTitle: "",
            promptDescription: "",
            promptType: "",
            hasSend: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({ loading: true })
        let getData = await getInterviewEdit(this.props.match.params.id)

        if (getData.data.success) {
            const data = getData.data.results
            this.setState({
                data,
                loading: false
            })
        } else {
            this.setState({
                loading: false,
                showPrompt: true,
                promptType: "error"
            },() => {
                this.initialPrompt("Error",getData.data.message)
            })
        }

        let checkEmail = await checkSendEmail(this.props.match.params.id)

        if (checkEmail.data.isExists) {
            this.setState({
                hasSend: true
            })
        }
    }
    

    initialPrompt = (title, description) => {
        this.setState({
            promptTitle: title,
            promptDescription: description
        })
    }

    acceptPrompt = () => {
        switch (this.state.promptType) {
            case 'email':
                sendEmail(this.state.data?.interviewsId).then(res => {
                    if (res.data.success) {
                        const data = res.data.results
                        this.setState({
                            data,
                            loading: false
                        })
                    } else {
                        this.setState({
                            loading: false,
                            showPrompt: true,
                            promptType: "error"
                        },() => {
                            this.initialPrompt("Error",res.data.message)
                        })
                    }
                })
                break;
        
            default:
                this.setState({
                    showPrompt: false
                })
                break;
        }
    }

    ButtonSendEmail = () => {
        switch(this.state.hasSend) {
            case false:
                return (
                    <Typography.Text strong={true}>Email has been send</Typography.Text>
                )

            default:
                return (
                    <Button type="primary" icon={<SendOutlined />} onClick={this.sendEmailInterview}>
                        Send Email
                    </Button>
                )
        }
    }

    sendEmailInterview = async () => {
        this.setState({ loading: true })
        let getData = await sendEmail(this.props.match.params.id)

        if (getData.data.success) {
            this.setState({
                showPrompt: true,
                promptTitle: "Berhasil",
                promptDescription: "Berhasil mengirim email",
                loading: false,
                hasSend: true
            }, () => {
                this.fetchData()
            })
        } else {
            this.setState({
                loading: false,
                showPrompt: true,
                promptType: "error"
            },() => {
                this.initialPrompt("Error",getData.data.message)
            })
        }
    }

  render() {
    return (
        <div className="app-container">
            <Prompt open={this.state.showPrompt} title={this.state.promptTitle} description={this.state.promptDescription} onCancel={() => this.setState({ showPrompt: false })} onAccept={this.acceptPrompt} />
            <Card title="Interview Details" extra={<this.ButtonSendEmail />}>
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    Schedule Date :
                                </Typography.Text>
                                <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                    {this.state.data?.scheduleDate ?? '-'}
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    Start Time :
                                </Typography.Text>
                                <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                    {this.state.data?.startTime ?? '-'}
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    End Time :
                                </Typography.Text>
                                <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                    {this.state.data?.endTime ?? '-'}
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    Location :
                                </Typography.Text>
                                <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                    {this.state.data?.location ?? '-'}
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    Location Link :
                                </Typography.Text>
                                <Button size='small' href={this.state.data?.locationLink} icon={<EnvironmentOutlined />} type="default">
                                    Location
                                </Button>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap size="small">
                                <Typography.Text>
                                    Quota :
                                </Typography.Text>
                                <Typography.Text strong={true} style={{ fontSize: 15 }}>
                                    {this.state.data?.quota ?? 0}
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                    <Divider className="divider" />
                    <ListDriver interviewsId={this.props.match.params.id} />
                </div>
            </Card>
        </div>
    )
  }
}

export default InterviewsDetails