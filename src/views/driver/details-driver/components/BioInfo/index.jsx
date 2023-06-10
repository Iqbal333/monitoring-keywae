import { Segmented, Card, Col, Descriptions, Image, Row } from 'antd';
import React from 'react'
import noImage from '@/assets/images/no-image.png'
import './index.less'
import dayjs from 'dayjs'
const { Meta } = Card;

export default function BioInfo(props) {
    let widthCard = ((window.screen.width / 2) * 650) / window.screen.width
    let heightCard = ((window.screen.height / 2) * 400) / window.screen.height

    return (
        <div>
            <Card style={{ marginBottom: 10 }}>
                <Segmented block
                    options={[
                    'Info Driver',
                    'Riwayat Pesanan',
                    'Riwayat Penarikan',
                    'Review',
                    '',
                    ]}
                />
            </Card>
            <Card style={{ marginBottom: 10 }} extra="<Button>">
                <Row align={'top'}>
                    <Col span={5}>
                        <Descriptions title="DATA PRIBADI" column={1} size='small' layout="vertical">
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Nama Lengkap">{props?.data?.fullName ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="NIK">{props?.data?.idNumber}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Email">{props?.data?.email ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="No. Telepon">{props?.data?.phoneNumber ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="No. Telepon (Alternatif)">{props?.data?.phoneNumberSecondary ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Tempat, Tanggal Lahir">{props?.data?.birthPlace ?? '-'}, {props?.data?.birthDate ? dayjs(props?.data?.birthDate).format('DD MMMM YYYY'): '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Jenis Kelamin">{props?.data?.gender  ?? '-'}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={5}>
                        <Descriptions title="DATA ALAMAT" column={1} size='small' layout="vertical">
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Provinsi">{props?.data?.address?.currentRegionName ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Kabupaten/Kota">{props?.data?.address?.currentDistrictName ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Kecamatan">{props?.data?.address?.currentSubDistrictName ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Kelurahan/Desa">{props?.data?.address?.currentVillageName ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Alamat">{props?.data?.address?.currentAddress ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Kode Pos">-</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={5}>
                         <Descriptions title="DATA KENDARAAN" column={1} size='small' layout="vertical">
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Jenis Kendaraan">{props?.data?.vehicleTypes?.vehicle ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Merek Kendaraan">{props?.data?.vehicleTypes?.brand ?? '-'} - {props?.data?.vehicleTypes?.subBrand ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Plat Nomor">{props?.data?.vehicleTypes?.plateNumber ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Tahun Pembuatan">{props?.data?.vehicleTypes?.yearMake ?? '-'}</Descriptions.Item>
                            <div style={{ marginBottom:10}}></div>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Nomor SIM">{props?.data?.driverLicense?.driverNo}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Tanggal Kadaluarsa SIM">{props?.data?.driverLicense?.driverIdExpired ? dayjs(props?.data?.driverLicense?.driverIdExpired).format('DD MMMM YYYY'):'-'}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={5}>
                         <Descriptions title="DATA REKENING" column={1} size='small' layout="vertical">
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Bank">{props?.data?.bank?.bank ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Nomor Rekening">{props?.data?.bank?.bankAccount ?? '-'}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{ maxWidth: 170 }} label="Nama Pemilik">{props?.data?.bank?.bankAccountName ?? '-'}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={4}>
                        <div style={{ marginLeft: 5, marginRight: 5 }}>
                            <div className="content-container">
                                <Image src={props?.data?.photo ? props?.data?.photo : noImage} style={{ maxWidth: 200, height:280, borderRadius:10 }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
            
            <Card title="BERKAS" style={{ marginBottom: 10 }}>
                <Row align={'top'} gutter={16}>
                    <Col span={6}>
                        <Card>
                            {props.data?.idNumberFile ? (
                                <Image
                                    src={props.data?.idNumberFile}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                            <Meta style={{ marginTop: 10 }} title="KTP" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            {props.data?.driverLicense?.driverNumberFile ? (
                                <Image
                                    src={props.data?.driverLicense?.driverNumberFile}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                            <Meta style={{ marginTop: 10 }} title="SIM" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            {props.data?.vehicleTypes?.vehicleRegNumberFile ? (
                                <Image
                                    src={props.data?.vehicleTypes?.vehicleRegNumberFile}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                            <Meta style={{ marginTop: 10 }} title="STNK" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            {props.data?.bank?.bankAccountFile ? (
                                <Image
                                    src={props.data?.bank?.bankAccountFile}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            ) : (
                                <Image
                                    src={noImage}
                                    style={{ borderRadius: 5 }}
                                    width={widthCard}
                                    height={heightCard}
                                />
                            )}
                            <Meta style={{ marginTop: 10 }} title="BUKU REKENING" />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
