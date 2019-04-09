var io = require('socket.io-client')
let ws = io("ws://127.0.0.1:3000");
module.exports = {
  getWS: function () {
    return ws
  }
}