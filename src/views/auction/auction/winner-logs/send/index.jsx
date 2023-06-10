import React from 'react';
import { Button, Card, Checkbox, Form } from 'antd';
import ProfitSharing from '@/components/Form';
import './index.less';
import { BtnBack } from '@/components/Button';

const SendDetail = () => {
    
    const [formRef] = Form.useForm();
    
    const formLayout = {
        labelCol: {
            sm: { span: 7 },
        },
        wrapperCol: {
            sm: { span: 24 },
        },
        layout: 'vertical'
    };
    
    const inputsAuctioneer = [
        {
            name: 'fullNameAuctioneer',
            label: 'Nama Lengkap',
            placeholder: 'nama lengkap',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
          },
        {
            name: 'phoneNumberAuctioneer',
            label: 'Nomor HP',
            placeholder: 'nomor hp',
            type: 'number',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'addressAuctioneer',
            label: 'Alamat Lengkap',
            placeholder: 'alamat lengkap',
            type: 'textarea',
            rows: '4',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'provinceAuctioneer',
            label: 'Provinsi',
            placeholder: 'provinsi',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'cityAuctioneer',
            label: 'Kabupaten / Kota',
            placeholder: 'kabupaten / kota',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'subdistrictAuctioneer',
            label: 'Kecamatan',
            placeholder: 'kecamatan',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'villageAuctioneer',
            label: 'Kelurahan',
            placeholder: 'kelurahan',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'postalCodeAuctioneer',
            label: 'Kode Pos',
            placeholder: 'kode pos',
            type: 'number',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
    ];

    const inputsParticipant = [
        {
            name: 'fullNameParticipant',
            label: 'Nama Lengkap',
            placeholder: 'nama lengkap',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
          },
        {
            name: 'phoneNumberParticipant',
            label: 'Nomor HP',
            placeholder: 'nomor hp',
            type: 'number',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'addressParticipant',
            label: 'Alamat Lengkap',
            placeholder: 'alamat lengkap',
            type: 'textarea',
            rows: '4',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'provinceParticipant',
            label: 'Provinsi',
            placeholder: 'provinsi',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'cityParticipant',
            label: 'Kabupaten / Kota',
            placeholder: 'kabupaten / kota',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'subdistrictParticipant',
            label: 'Kecamatan',
            placeholder: 'kecamatan',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'villageParticipant',
            label: 'Kelurahan',
            placeholder: 'kelurahan',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'postalCodeParticipant',
            label: 'Kode Pos',
            placeholder: 'kode pos',
            type: 'number',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
    ];

    const inputsItems = [
        {
            name: 'category',
            label: 'Kategori Barang',
            placeholder: 'kategori barang',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
          },
        {
            name: 'subCategory',
            label: 'Sub Kategori',
            placeholder: 'sub kategori',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'weight',
            label: 'Berat Barang',
            placeholder: 'berat barang',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
        {
            name: 'dimention',
            label: 'Dimensi Barang',
            placeholder: 'dimensi barang',
            size: 'large',
            rules: [
              {
                required: true,
              },
            ],
        },
    ];

    return (
        <div className='app-container'>
            <Card title={<BtnBack to="/auction/winner-logs">Kirim Lelang</BtnBack>}>
                <p style={{fontSize: '18px', maxWidth: '500px', marginTop: '-10px'}}>Silahkan isi formulir berikut untuk melakukan pengiriman barang lelang dari pelelang ke pemenang.</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '32%', border: '1px solid lightGray', borderRadius: '10px', padding: '10px'}}>
                        <h5 style={{fontSize: '18px', margin: '4px 0 20px 0'}}>Alamat Pelelang</h5>
                        <ProfitSharing
                            formName="Data Pelelang"
                            formLayout={formLayout}
                            formRef={formRef}
                            validateOnChange={false}
                            inputs={inputsAuctioneer}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '32%', border: '1px solid lightGray', borderRadius: '10px', padding: '10px'}}>
                        <h5 style={{fontSize: '18px', margin: '4px 0 20px 0'}}>Alamat Pemenang</h5>
                        <ProfitSharing
                            formName="Data Pemenang"
                            formLayout={formLayout}
                            formRef={formRef}
                            validateOnChange={false}
                            inputs={inputsParticipant}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '32%'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid lightGray', borderRadius: '10px', padding: '10px'}}>
                            <h5 style={{fontSize: '18px', margin: '4px 0 20px 0'}}>Informasi Barang</h5>
                            <ProfitSharing
                                formName="Informasi Barang"
                                formLayout={formLayout}
                                formRef={formRef}
                                validateOnChange={false}
                                inputs={inputsItems}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '2px solid lightGreen', borderRadius: '10px', padding: '10px', marginTop: '30px'}}>
                            <h5 style={{fontSize: '18px', margin: '4px 0 20px 0', fontStyle: 'italic'}}>Perhatian!</h5>
                            <ul style={{ marginTop: '-10px'}}>
                                <li>Pastikan bahwa alamat pengirim ( pelelang ) sudah benar</li>
                                <li>Pastikan bahwa alamat penerima ( pemenang ) sudah benar</li>
                                <li>Dan pastikan bahwa informasi barang yang tercantum sudah benar</li>
                            </ul>
                            <Checkbox>Dengan mencentang kotak ini anda Yakin semua data adalah benar dan bertanggung jawab!</Checkbox>
                            <Button type='primary' style={{marginTop: '20px'}}>Submit</Button>
                        </div>
                        
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default SendDetail;