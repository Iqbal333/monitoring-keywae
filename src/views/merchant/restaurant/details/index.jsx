import { approvalResto, getDetailResto, verificationResto } from '@/api/merchant/restaurant';
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Descriptions,
  Tag,
  Tabs,
  Alert,
  Spin,
} from 'antd';
import React, { Component } from 'react';
import noImage from '@/assets/images/no-image.png';
import './index.less';
import ApprovePrompt from '@/components/Modal/DriverDetails';

export class RestoDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      showPrompt: false,
      promptType: 'success',
      promptMessage: '',
      loading: false,
      showAlert: false,
      alertType: 'success',
      alertMessage: ''
    };
  }

  fetchData = async () => {
    this.setState({ loading: true });
    let getData = await getDetailResto(this.props.match.params.restaurantId);

    console.log(getData);
    if (getData.data.success) {
      const data = getData.data.results;
      this.setState({
        data,
        loading: false,
      });
    } else {
      this.setState(
        {
          loading: false,
        },
        () => {}
      );
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  tabItems() {
    return [
      {
        label: 'Resto',
        key: 1,
        children: <PartnerInfo data={this.state.data} />,
      },
      {
        label: 'Menu',
        key: 2,
        children: <MenuInfo data={this.state.data} />,
      },
    ];
  }

  render() {
    return (
      <div className='app-container'>
        {this.state.loading && (
          <div style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.5)' }}>
            <Spin size='large' />
          </div>
        )}
        {this.state.showAlert && (
          <Alert style={{ marginBottom: 10 }} message={this.state.alertMessage} type={this.state.alertType} closable onClose={() => this.setState({ showPrompt: false })} />
        )}
        <ApprovePrompt 
          open={this.state.showPrompt} 
          title="Perhatian" 
          description="Pastikan data sudah lengkap!" 
          onAccept={() => {
            this.setState({
              loading: true
            })
            if (this.state.data?.isVerify === false && this.state.data?.isApprove === false) {
              verificationResto(this.state.data?.foodPartnerId)
                    .then(results => {
                      if (results.data.success) {
                        this.setState({
                          alertMessage: 'Berhasil diverifikasi',
                          showPrompt: false,
                          loading: false,
                          showAlert: true
                        }, () => {
                          this.fetchData()
                        })
                      } else {
                        this.setState({
                          alertType: 'error',
                          alertMessage: 'Gagal memverifikasi, silahkan coba lagi nanti.',
                          showPrompt: false,
                          loading: false,
                          showAlert: true
                        })
                      }
                    })
                    .catch(err => {
                      this.setState({
                        alertType: 'error',
                        alertMessage: 'Gagal, silahkan coba lagi nanti.',
                        showPrompt: false,
                        loading: false,
                        showAlert: true
                      })
                    })
            } else {
              approvalResto(this.state.data?.foodPartnerId)
              .then(results => {
                console.log(results)
                if (results.data.success) {
                  this.setState({
                    alertMessage: 'Berhasil disetujui',
                    showPrompt: false,
                    loading: false,
                    showAlert: true
                  }, () => {
                    this.fetchData()
                  })
                } else {
                  this.setState({
                    alertType: 'error',
                    alertMessage: 'Gagal menyetujui, silahkan coba lagi nanti.',
                    showPrompt: false,
                    loading: false,
                    showAlert: true
                  })
                }
              })
              .catch(err => {
                this.setState({
                  alertType: 'error',
                  alertMessage: 'Gagal, silahkan coba lagi nanti.',
                  showPrompt: false,
                  loading: false,
                  showAlert: true
                })
              })
            }
          }}
          onCancel={() => {
            this.setState({
              showPrompt: false,
              loading: false,
            })
          }}
        />
        <Card
          title='RESTAURANT DETAIL'
          extra={
            (this.state.data?.isVerify === false && this.state.data?.isApprove === false) ? (
              <>
                <Button type='primary' onClick={() => {
                  this.setState({
                    showPrompt: true
                  })
                }}>
                  <CheckSquareOutlined />
                  Verifikasi
                </Button>
                <Button
                  type='primary'
                  style={{ marginLeft: 10 }}
                  danger
                  onClick={() => {
                    
                  }}
                >
                  <CloseSquareOutlined />
                  Tolak
                </Button>
              </>
            ) : (this.state.data?.isVerify === true && this.state.data?.isApprove === false) ? (
              <>
                <Button type='primary' onClick={() => {
                  this.setState({
                    showPrompt: true
                  })
                }}>
                  <CheckSquareOutlined />
                  Approval
                </Button>
                <Button
                  type='primary'
                  style={{ marginLeft: 10 }}
                  danger
                  onClick={() => {}}
                >
                  <CloseSquareOutlined />
                  Tolak
                </Button>
              </>
            ):(<></>)
          }
        >
          <div className='container'>
            <Tabs
              style={{ minHeight: 500 }}
              tabPosition='left'
              items={this.tabItems()}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default RestoDetail;

const PartnerInfo = ({ data }) => {
  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <Descriptions title='Biodata' layout='vertical'>
          <Descriptions.Item
            label='Nama Lengkap'
            labelStyle={{ fontWeight: '600' }}
            strong={true}
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerName ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Email'>
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerEmail ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nomor Telepon'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerPhone ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='NIK'>
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerIdcardNummber ?? '-'}
            </Typography.Text>{' '}
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nama Lengkap (KTP)'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerIdcardName ?? '-'}
            </Typography.Text>{' '}
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nomor NPWP'
            span={2}
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerNpwpNumber ?? '-'}
            </Typography.Text>{' '}
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='NPWP'>
            <Image
              src={data?.foodPartnerNpwpFile ?? noImage}
              strong={true}
              width={200}
            />
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Status Verifikasi'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.isVerify === true ? (
                <Tag color='green'>Terverifikasi</Tag>
              ) : (
                <Tag color='volcano'>Belum Terverifikasi</Tag>
              )}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Status Approval'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.isApprove === true ? (
                <Tag color='green'>Sudah Disetujui</Tag>
              ) : (
                <Tag color='volcano'>Belum Disetujui</Tag>
              )}
            </Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ marginBottom: 10 }}>
        <Descriptions title='Bank' layout='vertical'>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nomor Rekening'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerBankNummber ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nama Pemilik'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data?.foodPartnerBankName ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Foto Buku Rekening'
          >
            <Image
              src={data?.foodPartnerBankFile ?? noImage}
              strong={true}
              width={200}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ marginBottom: 10 }}>
        <Descriptions title='' layout='vertical'>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Resto'>
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.restaurantName ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Jenis Usaha'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.businessTypeName ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Email Resto'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.restaurantEmail ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Nomor Telepon Resto'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.restaurantPhone ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Kode Pos'
          >
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.restaurantPostalCode ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Alamat'>
            <Typography.Text strong={true} style={{ fontSize: 15 }}>
              {data.restaurantAddressPrimary ?? '-'} -
              {data.restaurantAddresSecondary ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Provinsi'
          >
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantRegion ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Kabupaten / Kota'
          >
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantDistrict ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Kecamatan'
          >
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantSubDistrict ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Kelurahan'
          >
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantVillage ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Catatan'>
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantNote ?? '-'}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item labelStyle={{ fontWeight: '600' }} label='Status'>
            <Typography.Text strong={true} style={{ fontSize: 14 }}>
              {data.restaurantOpenStatus === true ? (
                <Tag color='green'>Buka</Tag>
              ) : (
                <Tag color='red'>Tutup</Tag>
              )}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{ fontWeight: '600' }}
            label='Foto Resto'
          >
            <Image
              src={data.restaurantPhoto ?? noImage}
              strong={true}
              width={200}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

const MenuInfo = ({ data }) => {
  return (
    <>
      {data?.length > 0 ? (
        data.map((val) => (
          <Row justify={'space-around'}>
            <Col span={4}>
              <Image
                src={val?.productImage ? val.productImage : noImage}
                style={{ width: '100%' }}
              />
              <span className='menu-title'>{val?.productName ?? '-'}</span>
              <span className='menu-price'>
                Rp. {Number(val?.productBasePrice) ?? 0}
              </span>
            </Col>
          </Row>
        ))
      ) : (
        <span className='menu-title'>Menu belum tersedia.</span>
      )}
    </>
  );
};
