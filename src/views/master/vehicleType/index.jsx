import React from 'react';
import { Card, Table, Button, Space, Input, Form } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { getVehicleType } from '@/api/master/globals/vehicleType';

class VehicleType extends React.Component {
  state = {
    vehicle: [],
    addModalVisible: false,
    addModalLoading: false,
    loading: false,
    total: 0,
    listQuery: {
      page: 0,
      limit: 10,
    },
    filter: {
      search: '',
    },
  };

  getVehicleType = async () => {
    const result = await getVehicleType();
    console.log(result);
    const vehicle = result.data.results;

    if (result.data.success === true) {
      this.setState({
        vehicle,
      });
    }
  };

  componentDidMount() {
    this.getVehicleType();
  }

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

  resetFilter = () => {
    this.setState(
      (state) => ({
        listQuery: {
          page: 0,
          limit: 2,
        },
        filter: {
          search: '',
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  handleAdd = (row) => {
    this.setState({
      addModalVisible: true,
    });
  };

  render() {
    const { vehicle } = this.state;
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
    //console.log(vehicle Type);
    const columns = [
      {
        title: 'No',
        key: 'No',
        render: (_, record) => <>{this.state.vehicle.indexOf(record) + 1}</>,
      },
      {
        title: 'Nama Tipe Kendaraan',
        dataIndex: 'vehicleName',
        key: 'vehicleName',
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'vehicleTypeId',
      //   key: 'vehicleTypeId',
      //   render: (_, record) => (
      //     <Space wrap>
      //       <Button
      //         size='small'
      //         icon={<EditOutlined />}
      //         onClick={() => {
      //           this.setState({
      //             editModalOpen: true,
      //           });
      //         }}
      //         type='primary'
      //       >
      //         Edit
      //       </Button>
      //       <Button
      //         size='small'
      //         icon={<DeleteOutlined />}
      //         onClick={() => {
      //           this.setState({
      //             deleteModalOpen: true,
      //           });
      //         }}
      //         type='primary'
      //         danger
      //       >
      //         Delete
      //       </Button>
      //     </Space>
      //   ),
      // },
    ];

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
                onClick={this.getVehicleType}
              >
                Search
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type='default'
                icon={<FilterFilled />}
                onClick={this.resetFilter}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Card title='LIST TIPE KENDARAAN'>
          <Table
            dataSource={vehicle}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default VehicleType;
