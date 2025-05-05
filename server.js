const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy middleware configuration
const proxyOptions = Object.assign({}, {
  target: 'https://api.alquran.cloud',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/v1',
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  },
  onError: function(err, req, res) {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy Error', message: err.message });
  },
  secure: false,
  logLevel: 'debug',
});

// Use the proxy for /api routes
app.use('/api', createProxyMiddleware(proxyOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Server Error', message: err.message });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
}); 