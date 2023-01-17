//
// const {createProxyMiddleware} = require('http-proxy-middleware');
//
// const proxy = require('http-proxy-middleware');
//
// module.exports = function(app) {
//   app.use(proxy.createProxyMiddleware('/api', { target: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.49332,-6.31718&radius=1000000&types=coffee&key=AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c'}));
// };
//
//
// //
// // module.exports = function(app) {
// //   app.use(createProxyMiddleware('/', { target: 'http://localhost:3000/' }));
// // };
//

const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/', { target: 'http://localhost:3000/' }));
};


const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/api', { target: 'http://localhost:3000/' }));
};









