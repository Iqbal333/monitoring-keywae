const CracoLessPlugin = require('craco-less');
const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }, { plugin: CracoAliasPlugin }],
  devServer: {
    proxy: {
      '/auth': {
        target: 'https://dev-api.keywae.com/keyauth/panel/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/auth/v1': 'v1',
        },
        onProxyRes: (proxyRes, req, res) => {
          const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
          console.log(exchange);
        },
      },
      '/keyauth': {
        target: 'https://dev-api.keywae.com/keyauth/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/keyauth/v1': 'v1',
        },
        onProxyRes: (proxyRes, req, res) => {
          const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
          console.log(exchange);
        },
      },
      '/api': {
        target: 'https://dev-api.keywae.com/drivers/panel/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/v1': 'v1',
        },
        onProxyRes: (proxyRes, req, res) => {
          const exchange = `[${req.method}] [${proxyRes.statusCode}] ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`;
          console.log(exchange);
        },
      },
      '/static': {
        target: 'http://103.214.53.149',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/static': '/api/static',
        },
      },
      '/register': {
        target: 'https://dev-api.keywae.com/drivers/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/register/v1': 'v1',
        },
      },
      '/shop': {
        target: 'https://dev-api.keywae.com/keyshop/panel',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/shop/v1': 'v1',
        },
      },
      '/merchant': {
        target: 'https://dev-api.keywae.com/keyfood/panel',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/merchant/v1': 'v1',
        },
      },
      '/auction': {
        target: 'https://dev-api.keywae.com/keylang/panel',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/auction/v1': 'v1',
        },
      },
    },
  },
};
