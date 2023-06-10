import React from 'react';
import { Card, Table, Button, Space, Input, Form } from 'antd';
import { EyeOutlined, SearchOutlined, FilterFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getDistrict } from '@/api/master/district';

class District extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionId: props.match.params.id,
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

  getDistrict = async () => {
    const result = await getDistrict(this.state.regionId);
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

  componentDidMount() {
    this.getDistrict();
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
        title: 'No',
        key: 'No',
        render: (_, record) => <>{this.state.district.indexOf(record) + 1}</>,
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        dataIndex: 'districtId',
        key: 'districtId',
        render: (_) => (
          <Space wrap>
            <Link to={`/master/sub-district/${_}`}>
              <Button size='small' icon={<EyeOutlined />} type='default'>
                Details
              </Button>
            </Link>
          </Space>
        ),
      },
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
        <Card title='LIST KABUPATEN'>
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

export default District;
