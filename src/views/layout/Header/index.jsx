import React from 'react';
import { connect } from 'react-redux';
import { Layout, Modal, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { logout, getUserInfo } from '@/store/actions';
import FullScreen from '@/components/FullScreen';
import Hamburger from '@/components/Hamburger';
import BreadCrumb from '@/components/BreadCrumb';
import Settings from '@/components/Settings';
import './index.less';

const { Header } = Layout;

const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
  } = props;

  token && getUserInfo(token);

  const handleLogout = (token) => {
    Modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to exit the system?',
      okText: 'Yes, Exit',
      cancelText: 'Cancel',
      onOk: () => {
        logout(token);
      },
    });
  };

  const onClick = ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout(token);
        break;
      default:
        break;
    }
  };

  const items = [
    {
      key: 'logout',
      danger: true,
      label: 'logout',
    },
  ];

  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: 'calc(100% - 80px)',
        };
      } else {
        styles = {
          width: 'calc(100% - 200px)',
        };
      }
    } else {
      styles = {
        width: '100%',
      };
    }
    return styles;
  };

  return (
    <>
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        // style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
        className={fixedHeader ? 'fix-header' : ''}
      >
        <Hamburger />
        <BreadCrumb />
        <div className='right-menu'>
          <FullScreen />
          <div className='dropdown-wrap'>
            <Dropdown menu={{ items, onClick }}>
              <div>
                <Avatar shape='square' size='medium' src={avatar} />
                <CaretDownOutlined
                  style={{ color: 'rgba(0,0,0,.3)' }}
                  type='caret-down'
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
