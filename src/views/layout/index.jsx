import React from 'react';
import { connect } from "react-redux";
import Header from "./Header";
import TagsView from "./TagsView";
// import Sider from "./Sider";
import Content from "./Content";

import { Layout } from 'antd';
import "./index.less";

const Main = (props) => {
  const { tagsView } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sider></Sider> */}
      <Layout>
        <Header/>
        {tagsView ? <TagsView /> : null}
        <Content />
      </Layout>
    </Layout>
  );
};

export default connect((state) => state.settings)(Main);
