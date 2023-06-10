import React, { Component } from 'react';
import { allEvent } from '@/api/auction/eventAuction/allEvent';
import {
  Card,
  Table,
  Avatar,
  Tag,
  Collapse,
  Pagination,
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EyeFilled, FilterFilled, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './index.less';
import { Icon } from '@/components/Icon';
import CountUp from 'react-countup';
import { eventDashboard } from '@/api/auction/eventAuction/eventDashboard';

class AllEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: false,
      total: 0,
      listQuery: {
        page: 0,
        limit: 10,
      },
      filter: {
        search: '',
        isVerify: true,
        isApprove: true,
        isRegister: true,
      },
      cardList: [
        {
            type: 'Semua Event',
            num: 0,
            icon: 'AppstoreOutlined',
            color: '#40c9c6',
        },
        {
            type: 'Event Berlangsung',
            num: 0,
            icon: 'HistoryOutlined',
            color: '#36a3f7',
        },
        {
            type: 'Peserta Event',
            num: 0,
            icon: 'UsergroupAddOutlined',
            color: '#40c9c6',
        },
        {
            type: 'Produk Event',
            num: 0,
            icon: 'ShoppingCartOutlined',
            color: '#36a3f7',
        },
      ]
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    allEvent(this.state.listQuery, this.state.filter).then(
      (response) => {
        this.setState({ loading: false });
        const list = response.data.results;
        const total = response.data.meta.total;

        this.setState((state) => ({
          list,
          total,
          listQuery: { ...state.listQuery, page: response.data.meta.page },
        }));
      }
    );

    eventDashboard().then(
        (response) => {
            this.setState({ loading: false });
            const card = response.data.results;

            // let card = {
            //     totalEvents: 0,
            //     eventRunning: 0,
            //     eventParticipant: 0,
            //     eventProduct: 0
            // }

            // if (list?.length > 0) {
            //     list.map((val, idx) => {
            //         card.totalEvents = card.totalEvents + (val.totalEvents ?? 0)
            //         card.eventRunning = card.eventRunning + (val.eventRunning ?? 0)
            //         card.eventParticipant = card.eventParticipant + (val.eventParticipant ?? 0)
            //         card.eventProduct = card.eventProduct + (val.eventProduct ?? 0)
            //     })
            // }

            this.setState((state) => ({
                cardList: [
                    {
                        ...state.cardList[0],
                        num: card.totalEvents
                    },
                    {
                        ...state.cardList[1],
                        num: card.eventRunning
                    },
                    {
                        ...state.cardList[2],
                        num: card.eventParticipant
                    },
                    {
                        ...state.cardList[3],
                        num: card.eventProduct
                    }
                ]
            }))
        }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  filterGender = (value) => {
    this.setState((state) => ({
      filter: {
        ...state.filter,
        genderId: value,
      },
    }));
  };

  filterStatus = (value) => {
    this.setState((state) => ({
      filter: {
        ...state.filter,
        isBanned: value,
      },
    }));
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

  changePage = (page) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: page - 1,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  changeLimit = (current, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 0,
          limit,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  resetFilter = () => {
    this.setState(
      (state) => ({
        listQuery: {
          page: 0,
          limit: 10,
        },
        filter: {
          search: '',
          isApprove: true,
        },
      }),
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const columns = [
      {
        title: 'Nama Event',
        dataIndex: 'eventName',
        key: 'eventName',
      },
      {
        title: 'Lokasi',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Tanggal Mulai',
        dataIndex: 'eventStartDate',
        key: 'eventStartDate',
        render: (_,record) => (
            <>{dayjs(_,'YYYY-MM-DD').format('DD MMMM YYYY')}</>
        )
      },
      {
        title: 'Tanggal Berakhir',
        dataIndex: 'eventEndDate',
        key: 'eventEndDate',
        render: (_,record) => (
            <>{dayjs(_,'YYYY-MM-DD').format('DD MMMM YYYY')}</>
        )
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (data) => (
          <Space wrap direction='horizontal' size={'middle'}>
            <Button title='Detail' size='small' icon={<EyeFilled />}>
              <Link to="#"> Detail</Link>
            </Button>
            <Button
              title='Delete'
              icon={<DeleteOutlined />}
              type='primary'
              size='small'
              danger
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
    return (
      <div className='app-container'>
        <div className='panel-group-container'>
            <Row gutter={40} className='panel-group'>
            {this.state.cardList.map((val, idx) => (
                <Col
                key={idx}
                lg={6}
                sm={12}
                xs={12}
                className='card-panel-col'
                onClick={() => {
                    this.fetchChartById(idx);
                }}
                >
                <div className='card-panel'>
                    <div className='card-panel-icon-wrapper'>
                    <Icon
                        className={val?.type}
                        style={{ fontSize: 55, color: val.color }}
                        icon={val?.icon}
                    />
                    </div>
                    <div className='card-panel-description'>
                    <p className='card-panel-text'>{val.type}</p>
                    <CountUp
                        end={val?.num}
                        start={0}
                        className='card-panel-num'
                    />
                    </div>
                </div>
                </Col>
            ))}
            </Row>
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Card>
            <Form layout='inline'>
              {/* <Form.Item label='Gender :'>
                <Select
                  style={{ width: 150 }}
                  value={this.state.filter?.genderId ?? ''}
                  onChange={this.filterGender}
                >
                  <Select.Option value=''>-</Select.Option>
                  <Select.Option value='0deb5bb3-faa8-437a-87d3-6337b768b272'>
                    Male
                  </Select.Option>
                  <Select.Option value='b4d1a750-b3f2-4095-89a1-f3fd500d3afe'>
                    Female
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label='Status :'>
                <Select
                  style={{ width: 150 }}
                  value={this.state.filter?.isBanned ?? ''}
                  onChange={this.filterStatus}
                >
                  <Select.Option value=''>-</Select.Option>
                  <Select.Option value='true'>Banned</Select.Option>
                  <Select.Option value='false'>No Banned</Select.Option>
                </Select>
              </Form.Item> */}
              <Form.Item name='name' label='Search :'>
                <Input
                  style={{ width: 250 }}
                  value={this.state.filter?.search ?? ''}
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
        </Collapse>
        <br />
        <Card title='Event Lelang'>
          <Table
            size='small'
            dataSource={this.state.list}
            rowKey={(record) => record.driverId}
            bodyStyle={{ overflowX: 'auto' }}
            columns={columns}
            loading={this.state.loading}
            pagination={false}
          ></Table>
          <br />
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
      </div>
    );
  }
}

export default AllEvent;
