'use strict'
const postsHandler = require('./posts-handler');
const util = require('./handler-util');

//ルーティングの設定
function route(req, res) {
  //本番環境のみHTTPS通信
  if (process.env.DATABESE_URL && req.headers['x-forwarded-proto'] === 'http') {
    util.handleNotFound(req, res);
  }
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts?delete=1':
      postsHandler.handleDelete(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    case '/favicon.ico':
      util.handleFavicon(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}

module.exports = {
  route
};