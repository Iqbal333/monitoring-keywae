import React, { Component } from 'react';
import { getDetail } from '@/api/merchant/category';
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Pagination,
  Avatar,
  Tag,
} from 'antd';
import { PlusOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons';
import { toRupiah } from '@/utils';
import noImage from '@/assets/images/no-image.png';

class DetailCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.match.params.categoryId,
      list: [],
      loading: false,
      total: 0,
      listQuery: {
        page: 0,
        limit: 10,
      },
      filter: {
        search: '',
      },
      addModalOpen: false,
      editModalOpen: false,
      addModalLoading: false,
      editModalLoading: false,
      editData: [],
      deleteModalOpen: false,
      deleteId: '',
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getDetail(
      this.state.categoryId,
      this.state.listQuery,
      this.state.filter
    ).then((response) => {
      this.setState({ loading: false });
      const list = response.data.results;
      console.log(list);
      const total = response.data.meta.total;

      this.setState((state) => ({
        list,
        total,
        listQuery: {
          ...state.listQuery,
          page: response.data.meta.page,
        },
        addModalOpen: false,
        addModalLoading: false,
      }));
    });
  };

  filterSearch = (e) => {
    let value = e.target.value;
    this.setState((state) => ({
      listQuery: {
        page: 0,
        limit: state.listQuery.limit ?? 2,
      },
      filter: {
        ...state.filter,
        search: value,
      },
    }));
  };

  handleAdd = () => {
    this.setState({
      addModalOpen: true,
    });
  };

  handleCancel = () => {
    this.setState({
      addModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
    });
  };

  handleAddSave = () => {};

  // handleDelete = () => {
  //   deleteSubBrand({
  //     categoryId: this.state.categoryId,
  //     categoryId: this.state.deleteId,
  //   })
  //     .then((res) => {
  //       if (res.data.success) {
  //         this.setState(
  //           {
  //             deleteModalOpen: false,
  //           },
  //           () => {
  //             this.fetchData();
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const columns = [
      {
        title: '#',
        key: 'No',
        width: 50,
        render: (_, record) => <>{this.state.list.indexOf(record) + 1}</>,
      },
      {
        title: 'Gambar Produk',
        dataIndex: 'productImage',
        key: 'productImage',
        render: (_, { productImage }) => (
          <>
            <Avatar
              shape='square'
              size={40}
              src={
                productImage !== null && productImage !== ''
                  ? productImage
                  : noImage
              }
            />
          </>
        ),
        width: 120,
        align: 'center',
      },
      {
        title: 'Nama Produk',
        dataIndex: 'productName',
        key: 'productName',
        ellipsis: true,
      },
      {
        title: 'Deskripsi',
        dataIndex: 'productDescription',
        key: 'productDescription',
        ellipsis: true,
      },
      {
        title: 'Ikon',
        dataIndex: 'productCategoryIcon',
        key: 'productCategoryIcon',
        render: (_, { productCategoryIcon }) => (
          <>
            <Avatar
              shape='square'
              size={35}
              src={
                productCategoryIcon !== null && productCategoryIcon !== ''
                  ? productCategoryIcon
                  : noImage
              }
            />
          </>
        ),
        align: 'center',
        width: 150,
      },
      {
        title: 'Kategori',
        dataIndex: 'productCategory',
        align: 'center',
        key: 'productCategory',
      },
      {
        title: 'Harga Produk',
        dataIndex: 'productTotalPrice',
        key: 'productTotalPrice',
        render: (_) => `${toRupiah(_)}`,
        align: 'center',
      },
      {
        title: 'Status Produk',
        dataIndex: 'productStatus',
        key: 'productStatus',
        align: 'center',
        width: 300,
        render: (tag) => (
          <>
            <Tag
              color={tag === 'Product Active / Available' ? 'green' : 'magenta'}
              key={tag}
            >
              {tag === 'Product Active / Available'
                ? tag
                : 'Product Unavailable'}
            </Tag>
          </>
        ),
      },
      {
        title: 'Nama Resto',
        dataIndex: 'restaurant',
        key: 'restaurant',
        render: (_) =>
          _ && Object.keys(_).length > 0 ? (
            <>{_.restaurantName}</>
          ) : (
            'Tidak Terdaftar'
          ),
        ellipsis: true,
      },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (_, record) => (
      //     <Space size={'middle'}>
      //     </Space>
      //   ),
      // },
    ];

    const addBtn = (
      <span>
        <Button
          title='Add New'
          icon={<PlusOutlined />}
          onClick={this.handleAdd}
        >
          Add New
        </Button>
      </span>
    );
    return (
      <div className='app-container'>
        <Card>
          <Form layout='inline'>
            <Form.Item name='search' label='Search'>
              <Input
                style={{ width: 250 }}
                value={this.state.filter.search}
                onChange={this.filterSearch}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                icon={<SearchOutlined />}
                onClick={this.fetchData}
              >
                Search
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type='default' icon={<FilterFilled />} onClick={''}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Card title='PRODUK SESUAI KATEGORI'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.categoryId}
            bodyStyle={{ overflowX: 'auto' }}
            columns={columns}
            loading={this.state.loading}
            pagination={false}
          />
          <Pagination
            size='small'
            total={this.state.total}
            pageSizeOptions={['10', '20', '50', '100']}
            defaultPageSize={this.state.listQuery.limit}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={this.changePage}
            current={this.state.listQuery.page + 1}
            onShowSizeChange={this.changeLimit}
            pageSize={this.state.listQuery.limit}
            showSizeChanger
            showQuickJumper
          />
        </Card>
        {/* <AddForm
          formName='add-brand'
          open={this.state.addModalOpen}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          refresh={this.fetchData}
          categoryId={this.props.match.params.id}
        />
        {this.state.editModalOpen && (
          <EditForm
            formName='edit-brand'
            initValues={this.state.editData}
            open={this.state.editModalOpen}
            confirmLoading={this.state.addModalLoading}
            onCancel={this.handleCancel}
            refresh={this.fetchData}
            categoryId={this.props.match.params.id}
          />
        )} */}
        {/* <Prompt
          open={this.state.deleteModalOpen}
          title={'Delete Data'}
          description={'Delete this data?'}
          onCancel={this.handleCancel}
          onAccept={this.handleDelete}
        /> */}
      </div>
    );
  }
}

export default DetailCategory;
