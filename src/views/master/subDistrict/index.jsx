import React from 'react';
import { Card, Table, Button, Space, Input, Form } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, SearchOutlined, FilterFilled } from '@ant-design/icons';
import { getSubDistrict } from '@/api/master/subDistrict';

class SubDistrict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      districtId: props.match.params.id,
      district: [],
      addModalVisible: false,
      addModalLoading: false,
      loading: false,
      listQuery: {
        page: 0,
        limit: 10,
      },
      filter: {
        search: '',
      },
    };
  }

  getSubDistrict = async () => {
    const result = await getSubDistrict(this.state.districtId);
    // console.log(result.data);
    const district = result.data.results;

    if (result.data.success === true) {
      this.setState({
        district,
      });
    }
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

  componentDidMount() {
    this.getSubDistrict();
  }

  handleAdd = (row) => {
    this.setState({
      addModalVisible: true,
    });
  };
  render() {
    const { district } = this.state;

    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.district.indexOf(record) + 1}</>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        dataIndex: 'subDistrictId',
        key: 'subDistrictId',
        render: (_, record) => (
          <Space wrap>
            <Link to={`/master/village/${_}`}>
              <Button size='small' icon={<EyeOutlined />} type='default'>
                Details
              </Button>
            </Link>
          </Space>
        ),
      },
    ];
    //console.log(data);
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
        <Card title='LIST KECAMATAN'>
          <Table
            dataSource={district}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default SubDistrict;
