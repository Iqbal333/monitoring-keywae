import React from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons';
import { getRegion } from '@/api/master/region';

class Region extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
      total: 0,
      deleteModalOpen: false,
      listQuery: {
        page: 0,
        limit: 10,
      },
      filter: {
        search: '',
      },
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    getRegion(this.state.listQuery, this.state.filter).then((response) => {
      this.setState({ loading: false });
      const list = response.data.results;

      this.setState((state) => ({
        list,
        listQuery: { ...state.listQuery, page: 1 },
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

  componentDidMount() {
    this.fetchData();
  }

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
    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.list.indexOf(record) + 1}</>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        dataIndex: 'regionId',
        key: 'regionId',
        render: (_, record) => (
          <Space wrap>
            <Link to={`/master/district/${_}`}>
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
        <Card title='LIST PROVINSI'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.regionId}
            bodyStyle={{ overflowX: 'auto' }}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
          <br />
        </Card>
      </div>
    );
  }
}

export default Region;
