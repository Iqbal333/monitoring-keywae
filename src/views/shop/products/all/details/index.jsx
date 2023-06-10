import { getProductDetail } from '@/api/shops/products';
import {
  Card,
  Carousel,
  Col,
  Descriptions,
  Image,
  Row,
  Button,
  Tabs,
} from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import noImage from '@/assets/images/no-image.png';
import { toRupiah } from '@/utils';
import { ArrowLeftOutlined } from '@ant-design/icons';

const DetailProduct = ({ match }) => {
  const [photos, setPhotos] = useState([]);
  const [product, setProduct] = useState({});
  const [store, setStore] = useState({});

  useEffect(() => {
    if (match.params.id) {
      getProductDetail(match.params.id).then((results) => {
        if (results.data.success) {
          setProduct(results.data?.productinfo);
          setPhotos(results.data?.images);
          setStore(results.data?.store);
        }
      });
    }
  }, []);

  const tabItems = [
    {
      key: 'product_id',
      label: `Produk Detail`,
      children: (
        <div className=''>
          <Row gutter={5} style={{ marginBottom: 15, marginTop: 10 }}>
            <Col span={8}>
              <Card title='Foto Produk'>
                <Carousel autoplay>
                  {photos && photos.length > 0 ? (
                    photos.map((val) => (
                      <div>
                        <Image
                          src={val.productimagefile}
                          width={val.width}
                          height={val.height}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <Image src={noImage} width={600} height={600} />
                    </div>
                  )}
                </Carousel>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Descriptions
                  layout='horizontal'
                  bordered
                  column={1}
                  title='Informasi Produk'
                >
                  <Descriptions.Item label='Nama Produk'>
                    {product?.name ?? '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Deskripsi'>
                    {product?.description ?? '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Harga'>
                    {product?.price ? toRupiah(product?.price) : 'Rp 0'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Minimal Pembelian'>
                    {product?.minQty ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Stok'>
                    {product?.stock ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Kondisi'>
                    {product?.condition ?? '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label='SKU'>
                    {product?.sku ?? '-'}
                  </Descriptions.Item>
                </Descriptions>
                <div style={{ marginBottom: 5, marginTop: 20 }} />
                <Descriptions
                  layout='horizontal'
                  bordered
                  column={1}
                  title='Dimensi Pengiriman'
                >
                  <Descriptions.Item label='Berat'>
                    {product?.weight + ' gram' ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Panjang'>
                    {product?.width + ' cm' ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Lebar'>
                    {product?.length + ' cm' ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Tinggi'>
                    {product?.height + ' cm' ?? 0}
                  </Descriptions.Item>
                  <Descriptions.Item label='Stok'>
                    {product?.stock ?? 0}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={8}>
              <Card title='Informasi Toko'>
                <center>
                  <Image
                    src={store?.store_image ?? noImage}
                    // width={width}
                    // height={height}
                  />
                </center>
                <br />
                <Descriptions layout='horizontal' bordered column={1}>
                  <Descriptions.Item label='Nama Toko'>
                    {store?.store_name ?? '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Lokasi'>
                    {store?.location ?? '-'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'transaction_id',
      label: `Transaksi pada Produk`,
      children: <div>Belum tersedia.</div>,
    },
  ];

  return (
    <div className='app-container'>
      <Button
        type='default'
        icon={<ArrowLeftOutlined />}
        onClick={() => window.history.back()}
      >
        Kembali
      </Button>
      <Card>
        <Tabs defaultActiveKey='product_id' items={tabItems} />
      </Card>
    </div>
  );
};

export default DetailProduct;
