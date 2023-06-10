import { Button, Card, Col, DatePicker, Descriptions, Image, Input, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import InputGroup from '../InputGroup'
import noImage from '@/assets/images/no-image.png'
import { UploadOutlined } from '@ant-design/icons'
import { getToken } from '@/utils/token'
import { UPLOAD_URL_DRIVER_NUMBER, UPLOAD_URL_ID_NUMBER, UPLOAD_URL_VEHICLE_REG } from '@/utils/variables'
import dayjs from 'dayjs'

export default function FileInfo(props) {
    let widthCard = ((window.screen.width / 2) * 472) / window.screen.width
    let heightCard = ((window.screen.height / 2) * 352) / window.screen.height

    return (
        <div>
            <Descriptions title="KTP" column={1} bordered>
                <Descriptions.Item label="Nomor KTP">{props?.data?.idNumber ?? '-'}</Descriptions.Item>
                <Descriptions.Item>
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
                </Descriptions.Item>
            </Descriptions>
            <Descriptions title="SIM" column={1} bordered>
                <Descriptions.Item label="Nomor SIM">{props?.data?.driverNo ?? '-'}</Descriptions.Item>
                <Descriptions.Item label="Kadaluarsa">{props?.data?.driverIdExpired ? dayjs(props?.data?.driverIdExpired).format('DD MMMM YYYY'):'-'}</Descriptions.Item>
                <Descriptions.Item>
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
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
