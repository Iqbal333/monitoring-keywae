import { Button, Card, Col, DatePicker, Image, Input, Row, Upload } from 'antd'
import React, { useState } from 'react'
import InputGroup from '../InputGroup'
import noImage from '@/assets/images/no-image.png'
import { UploadOutlined } from '@ant-design/icons'
import { getToken } from '@/utils/token'
import { UPLOAD_URL_DRIVER_NUMBER, UPLOAD_URL_ID_NUMBER, UPLOAD_URL_VEHICLE_REG } from '@/utils/variables'
import dayjs from 'dayjs'

export default function FileInfo(props) {
    let widthCard  = ((window.screen.width / 2) * 472) / window.screen.width
    let heightCard = ((window.screen.height / 2) * 352) / window.screen.height

    const [idNumber, setIdNumber] = useState("");
    const [idNumberFile, setIdNumberFile] = useState("");
    const [driverNumber, setDriverNumber] = useState("");
    const [driverNumberExp, setDriverNumberExp] = useState(dayjs());
    const [driverNumberFile, setDriverNumberFile] = useState("");
    const [vehicleRegNumberFile, setVehicleRegNumberFile] = useState("");

    return (
        <Card>
            {console.log(props.data)}
            <Row>
                <Col span={24}>
                    <InputGroup label="ID Number">
                        <Input type="number" className="input" defaultValue={idNumber ? idNumber:props.data.idNumber} onChange={(text) => setIdNumber(text.target.value)} placeholder="ID Number" />
                    </InputGroup>
                </Col>
                <Col span={24}>
                    <InputGroup label="ID Number File">
                        <div className="input">
                            {props.data?.idNumberFile ? (
                                <Image
                                    src={props.data?.idNumberFile}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                        </div>
                        <Upload action={UPLOAD_URL_ID_NUMBER} name={"idNumberFile"} headers={{ Authorization: `Bearer ${getToken()}` }} className="input" onChange={setIdNumberFile}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </InputGroup>
                </Col>
                <Col span={24}>
                    <InputGroup label="Nomor SIM">
                        <Input type="number" className="input" defaultValue={driverNumber ? driverNumber:props.data.driverNo} onChange={(text) => setDriverNumber(text.target.value)} placeholder="ID Number" />
                    </InputGroup>
                    <InputGroup label="Tanggal Berakhir">
                        <DatePicker name='driverNumberExp' value={driverNumberExp ? driverNumberExp:props.data.driverIdExpired} onChange={(text) => setDriverNumberExp(text.target.value)} />
                    </InputGroup>
                    <InputGroup label="SIM">
                        <div className="input">
                            {props.data?.driverNumberFile ? (
                                <Image
                                    src={props.data?.driverNumberFile}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                        </div>
                        <Upload action={UPLOAD_URL_DRIVER_NUMBER} name={"driverNumberFile"} headers={{ Authorization: `Bearer ${getToken()}` }} className="input" onChange={setDriverNumberFile}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </InputGroup>
                </Col>
                <Col span={24}>
                    <InputGroup label="Vehicle Register Number File">
                        <div className="input">
                            {props.data?.vehicleRegNumberFile ? (
                                <Image
                                    src={props.data?.vehicleRegNumberFile}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                        </div>
                        <Upload action={UPLOAD_URL_VEHICLE_REG} name={"vehicleRegNumberFile"} headers={{ Authorization: `Bearer ${getToken()}` }} className="input" onChange={setVehicleRegNumberFile}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </InputGroup>
                </Col>
                <Col span={24}>
                    <InputGroup label="Rekening Bank">
                        <div className="input">
                            {props.data?.idNumberFile ? (
                                <Image
                                    src={props.data?.idNumberFile}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                        </div>
                        <Upload action={UPLOAD_URL_ID_NUMBER} name={"idNumberFile"} headers={{ Authorization: `Bearer ${getToken()}` }} className="input" onChange={setIdNumberFile}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </InputGroup>
                </Col>
            </Row>
        </Card>
    )
}
