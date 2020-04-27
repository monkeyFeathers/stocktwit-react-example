const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://api.stocktwits.com/api/2/streams/symbol/aapl.json', changeOrigin: true }));
app.listen(9000);
