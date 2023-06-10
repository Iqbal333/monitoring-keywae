import React, { Component } from 'react';
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import store from "./store";
import Router from './router';
import 'dayjs/locale/id'
import dayjs from 'dayjs';

class App extends Component {

  componentDidMount() {
    dayjs.locale('id')
  }

  render() { 
    return (
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#136034',
            },
          }}
        >
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}
 
export default App;
