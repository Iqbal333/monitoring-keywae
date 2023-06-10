import React from 'react';
import { Card, Table, Button, Input, Form } from 'antd';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { getGender } from '@/api/master/gender';

class Gender extends React.Component {
  state = {
    gender: [],
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

  getGender = async () => {
    const result = await getGender();
    const gender = result.data.results;

    if (result.data.success === true) {
      this.setState({
        gender,
      });
    }
  };

  componentDidMount() {
    this.getGender();
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
    const { gender } = this.state;
    const columns = [
      {
        title: 'No',
        key: 'No',
        render: (_, record) => <>{this.state.gender.indexOf(record) + 1}</>,
      },
      {
        title: 'Nama Jenis Kelamin',
        dataIndex: 'gender',
        key: 'gender',
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
                onClick={this.getGender}
              >
                Search
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type='default'
                icon={<FilterFilled />}
                onClick={this.resetFilter}
                style={{ color: '' }}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        <Card title='LIST JENIS KELAMIN'>
          <Table
            dataSource={gender}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default Gender;
