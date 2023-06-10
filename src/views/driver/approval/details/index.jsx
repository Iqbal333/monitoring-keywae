import { approveDriver, getDetailDriver, rejectDriver, verifyDriver } from '@/api/drivers';
import ApprovePrompt from '@/components/Modal/DriverDetails';
import { CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Skeleton, Space, Tabs, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import AddressInfo from './components/AddressInfo';
import BankInfo from './components/BankInfo/BankInfo';
import DriverAddress from './components/DriverAddress';
import DriverInfo from './components/DriverInfo';
import FileInfo from './components/FileInfo';
import PersonalInfo from './components/PersonalInfo';
import VehicleInfo from './components/VehicleInfo';
import './index.less';
import { object } from 'prop-types';

export default function DriverDetails(props) {

    const [driverId, setDriverId] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptTitle, setPromptTitle] = useState('');
    const [promptDesc, setPromptDesc] = useState('');
    const [promptType, setPromptType] = useState('approve');

    useEffect(() => {
        setLoaded(true)
        if (props?.match?.params?.id) {
            getDetailDriver(props?.match?.params?.id).then((res) => {
                if (res.data.success) {
                    const results = res.data?.results ? filterArrays(res.data.results) : [];
                    setData(results)
                    setDriverId(props?.match?.params?.id)
                    setIsVerify(res.data?.results?.isVerify)
                    setIsApprove(res.data?.results?.isApprove)
                    setLoaded(false)
                }
            });
        }
        return () => {
            return false
        }
    }, [props?.match?.params?.id, refresh]);

    const filterArrays = (datas) => {
        try {
            let newData = [{}];
            let files = {};
            for (const property in datas) {
                if (
                    property !== 'vehicleTypes' &&
                    property !== 'bank' &&
                    property !== 'address'
                ) {
                    if (property === 'policeRecCertificateFile') {
                        files.policeRecCertificateFile = datas[property]
                    }
                    if (property === 'idNumber') {
                        files.idNumber = datas[property]
                    }
                    if (property === 'idNumberFile') {
                        files.idNumberFile = datas[property]
                    }
                    if (property === 'driverLicense') {
                        files.driverNo = datas[property]['driverNo']
                        files.driverIdExpired = datas[property]['driverIdExpired']
                    }
                    newData[0][property] = datas[property];
                } else {
                    if (property === 'vehicleTypes') {
                        files.vehicleRegNumberFile = datas[property]['vehicleRegNumberFile']
                        files.driverNumberFile = datas[property]['driverNumberFile']
                    }
                    newData.push(datas[property]);
                }
            }
            newData[0] = itemTemplate({
                label: 'Biodata',
                key: 'personal',
                children: componentTemplate(newData[0], 'personal'),
            });
            newData[1] = itemTemplate({
                label: 'Informasi Kendaraan',
                key: 'vehicle',
                children: componentTemplate(newData[1], 'vehicle'),
            });
            newData[2] = itemTemplate({
                label: 'Informasi Bank',
                key: 'bank',
                children: componentTemplate(newData[2], 'bank'),
            });
            newData[3] = itemTemplate({
                label: 'Informasi Alamat',
                key: 'address',
                children: componentTemplate(newData[3], 'address'),
            });
            newData[4] = itemTemplate({
                label: 'Berkas',
                key: 'files',
                children: componentTemplate(files, 'files'),
            });
            return newData;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const itemTemplate = ({ label, key, children }) => {
        return {
            label,
            key,
            children,
        };
    }

    const componentTemplate = (data, type) => {
        switch (type) {
            case 'personal':
                return (
                    <PersonalInfo data={data} driverId={props?.match?.params?.id} isVerify={isVerify} />
                );
            case 'vehicle':
                return (
                    <VehicleInfo data={data} driverId={props?.match?.params?.id} isVerify={isVerify} />
                );

            case 'bank':
                return (
                    <BankInfo data={data} driverId={props?.match?.params?.id} isVerify={isVerify} />
                );

            case 'address':
                return (
                    <AddressInfo data={data} driverId={props?.match?.params?.id} isVerify={isVerify} />
                );

            case 'files':
                return (
                    <FileInfo data={data} driverId={props?.match?.params?.id} isVerify={isVerify} />
                );

            default:
                return <></>;
        }
    }

    const closePrompt = () => {
        setShowPrompt(!showPrompt)
    }

    const acceptPrompt = () => {
        switch (promptType) {
            case 'verify':
                verifyDriver(driverId).then(res => {
                    if (res.data.success) {
                        setRefresh(val => val + 1)
                        setShowPrompt(!showPrompt)
                    }
                })
                break;
            
            case 'approve':
                approveDriver(driverId).then(res => {
                    if (res.data.success) {
                        setRefresh(val => val + 1)
                        setShowPrompt(!showPrompt)
                    }
                })
                break;

            case 'reject':
                rejectDriver(driverId).then(res => {
                    if (res.data.success) {
                        setRefresh(val => val + 1)
                        setShowPrompt(!showPrompt)
                    }
                })
                break;

            default:
                break;
        }
    }

    const actionPrompt = (title, description, type) => {
        setPromptTitle(title)
        setPromptDesc(description)
        setPromptType(type)
        setShowPrompt(!showPrompt)
    }

    return (
        <div className='app-container'>
            <ApprovePrompt open={showPrompt} onCancel={closePrompt} onAccept={acceptPrompt} title={promptTitle} description={promptDesc} />
            <Row gutter={8} style={{ paddingBottom: 10 }}>
                <Col xs={24} md={6}>
                    <DriverInfo driverId={props?.match?.params?.id} />
                    <DriverAddress driverId={props?.match?.params?.id} />
                </Col>
                <Col xs={24} md={18}>
                    <Card className="card-container" style={{ height: '100%' }}>
                        {loaded ? (
                            <>
                                <div className="header">
                                    <div className="header-left">
                                        <Skeleton.Button active size="default" className="header-child" />
                                        <Skeleton.Button active size="default" className="header-child" />
                                        <Skeleton.Button active size="default" className="header-child" />
                                        <Skeleton.Button active size="default" className="header-child" />
                                    </div>
                                    <div className="header-right">
                                        <Skeleton.Button active size="default" className="header-child" />
                                        <Skeleton.Button active size="default" className="header-child" />
                                    </div>
                                </div>
                                <Divider />
                                <div className="container">
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Input active size="large" block className="input-child" />
                                    <Skeleton.Button active size="default" className="header-child" />
                                </div>
                            </>
                        ) : (
                            <Tabs
                                tabBarExtraContent={{
                                    right: (
                                        isVerify ? (
                                            <Tag color="success">Terverifikasi</Tag>
                                        ) : (
                                            <></>
                                        )
                                    )
                                }}
                                items={data}
                            />
                        )}
                        {
                            (isVerify && isApprove === false) &&
                                (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10 }}>
                                        <Button title='Terima' type='primary' onClick={() => actionPrompt('Terima Driver', 'Pastikan kembali data driver sudah lengkap!', 'approve')}>
                                            <CheckSquareOutlined /> Terima
                                        </Button>
                                        <div style={{ marginLeft: 5, marginRight: 5 }} />
                                        <Button
                                            title='Tolak'
                                            type='primary'
                                            style={{ backgroundColor: '#C0392B' }}
                                            onClick={() => actionPrompt('Tolak Driver', 'Apakah anda yakin ingin menolak driver?', 'reject')}
                                        >
                                            <CloseCircleOutlined /> Tolak
                                        </Button>
                                    </div>
                                )
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
