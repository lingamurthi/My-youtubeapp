const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/youtube/v3/search',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/youtube/v3/videos',
    createProxyMiddleware({
      target: 'https://youtube.googleapis.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/complete',
    createProxyMiddleware({
      target: 'https://suggestqueries.google.com',
      changeOrigin: true,
    })
  );
};