const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
var routes = require('./routes/index');

var log4js = require("./plugins/log4j");
var bodyParser = require('body-parser');
const app = express()
app.use(log4js.useLog());
app.use(bodyParser.json());  //body-parser 解析json格式数据
routes(app)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)


  var server = require('http').createServer(app);
  // 开起socket
  var io = require('socket.io').listen(server);
  require('./plugins/socket').init(io)
  server.listen(port, host, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
  });
  // consola.ready({
  //   message: `Server listening on http://${host}:${port}`,
  //   badge: true
  // })
}
start()
