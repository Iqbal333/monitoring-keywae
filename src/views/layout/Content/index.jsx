import React from 'react';
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import routeList from '@/config/routerMap';
import { Layout } from 'antd';
import "./index.less";

const { Content } = Layout;

const LayoutContent = (props) => {
  const { location } = props;
  return (
    <Content style={{ height: 'calc(100% - 100px)' }}>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames='fade'
          exit={false}
        >
          <Switch location={location}>
            <Redirect exact from='/' to='/dashboard' />
            {routeList.map((route) => {
              return (
                <Route
                  key={route.path}
                  { ...route }
                />
              );
            })}
            <Redirect to='/error/404' />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Content>
  );
};

export default connect((state) => state.user)(withRouter(LayoutContent));
