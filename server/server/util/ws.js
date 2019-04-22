var io = require('socket.io-client')
var nuxtConfig = require('../../../nuxt.config')
let ws = io("ws://127.0.0.1:" + nuxtConfig.server.port);
module.exports = {
  getWS: function () {
    return ws
  }
}