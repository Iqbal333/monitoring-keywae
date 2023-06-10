import React from 'react';
import { Card, Table, Button, Input, Form } from 'antd';
import { SearchOutlined, FilterFilled } from '@ant-design/icons';
import { getVillage } from '@/api/master/village';

class Village extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subdistrictId: props.match.params.id,
      village: [],
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

  getVillage = async () => {
    const result = await getVillage(this.state.subdistrictId);
    // console.log(result.data);
    const village = result.data.results;

    if (result.data.success === true) {
      this.setState({
        village,
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
    this.getVillage();
  }

  handleAdd = (row) => {
    this.setState({
      addModalVisible: true,
    });
  };

  render() {
    const { village } = this.state;

    const columns = [
      {
        title: '#',
        key: 'No',
        render: (_, record) => <>{this.state.village.indexOf(record) + 1}</>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
        <Card title='LIST DESA'>
          <Table
            dataSource={village}
            columns={columns}
            loading={this.state.loading}
            pagination={true}
          ></Table>
        </Card>
      </div>
    );
  }
}

export default Village;
