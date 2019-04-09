var log4js = require("../../plugins/log4j");
log4js.configureToName('task')
let taskName = ''
let paramObj = {}
let logger = log4js.logger('task')
let WS = require("./ws").getWS();
WS.on('onClose', function incoming(data) {   //data.to  发给你对像　　data.user 自己　data.msg
  if (data.id == taskName) {
    WS.emit('UpdateLog', {
      type: 'update',
      num: paramObj.num || '',
      title: paramObj.title || '',
      log: 'stop task',
      taskId: taskName * 1
    })
    setTimeout(() => {
      logger.info(`${taskName}  stop task`)
      process.exit(0)
    }, 100)
  }
})

function serValue(value, p) {
  p.forEach(item => {
    value = value.replace(/%s/, item)
  })
  return value
}

module.exports = {
  info: function (value, ...p) {
    logger.info(`${taskName}  ${value}`, ...p)
    if (!isNaN(taskName * 1) && value.indexOf('cmd start') !== 0) {
      WS.emit('UpdateLog', {
        type: 'update',
        num: paramObj.num || '',
        title: paramObj.title || '',
        log: serValue(value, p),
        taskId: taskName * 1
      })
    }
  },
  error: function (value, ...p) {
    logger.error(`${taskName}  ${value}`, ...p)
    if (!isNaN(taskName * 1)) {
      WS.emit('UpdateLog', {
        type: 'update',
        num: paramObj.num || '',
        title: paramObj.title || '',
        log: 'ERROR: ' + serValue(value, p),
        taskId: taskName * 1
      })
      setTimeout(() => {
        process.exit(0)
      }, 100)
    }
  },
  init: function (obj) {
    taskName = obj.name
    paramObj = obj.params
  }
}