import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { addTag } from '@/store/actions';
import { getMenuItemInMenuListByProperty } from '@/utils';
import menuList from '@/config/menuConfig';
import './index.less';
import { Icon } from '@/components/Icon';

class Menus extends React.Component {
  state = {
    menuTreeNode: null,
    openKey: [],
    selectedKeys: [],
    menus: [],
  };

  getMenus(menuList) {
    return menuList.reduce((pre, items) => {
      items.icon = items.icon ? <Icon icon={items.icon} /> : null;
      if (items.children) {
        items.label = <div>{items.title}</div>;
        let menu = this.menuTemplate(items);
        menu.children = this.getMenus(items.children);
        pre.push(menu);
      } else {
        if (items.path) {
          items.label = <Link to={items.path}>{items.title}</Link>;
        } else {
          items.path = items.label.toLowerCase()
        }
        pre.push(this.menuTemplate(items));
      }
      return pre;
    }, []);
  }

  menuTemplate({ key, title, label, path, icon, type, children }) {
    return {
      key: key ? key:path,
      icon,
      children,
      label,
      type,
      path,
      title
    };
  }

  handleMenuSelect = ({ key = '/dashboard' }) => {
    let menuItem = getMenuItemInMenuListByProperty(menuList, 'path', key);
    this.props.addTag(menuItem);
  };

  menuSelected = (data, key) => {
    let check = data.filter((val) => val.key === key);
    if (check && check.length > 0) {
      return check[0];
    } else {
      let newArr = [];
      let temp = data.filter((val) => val.children !== undefined);
      temp.map((val) => {
        return val.children.find((val) => val.key === key).map((val) => {
          newArr.push(val);
          return val;
        });
      });
      return this.menuSelected(newArr, key);
    }
  };

  componentWillMount() {
    const menus = this.getMenus(menuList);
    this.setState({
      menus,
    });
  }

  //rendering menu
  render() {
    return (
      <div className='sidebar-menu-container'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <Menu
            mode='inline'
            theme='light'
            onClick={(menu) => {
              let cur = this.menuSelected(this.state.menus, menu.key);
              this.setState({
                selectedKeys: [menu.key]
              })
              this.props.addTag(cur);
            }}
            selectedKeys={this.state.selectedKeys}
            items={this.state.menus}
          />
        </Scrollbars>
      </div>
    );
  }
}

export default connect((state) => state.user, { addTag })(withRouter(Menus));
