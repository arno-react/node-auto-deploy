let updateLog = {}
let WsOrId = {}
let IdOrWs = {}
let WSS = {}
let taskModel = require('../model/task')
function allSend (emit,data) {
  Object.keys(WSS).map(key => {
    WSS[key].emit(emit, data)
  })
}
module.exports = {
  init:function (io) {
    io.on('connection', function connection(ws) {
      WSS[ws.id] = ws
      console.log('login')
      ws.on('message', function incoming(data) {
          console.log('message', data);
        }
      );
      ws.on('UpdateLog', async function incoming(data) {
        WsOrId[ws.id] = data.taskId
        IdOrWs[data.taskId] = ws.id
        if (data.type === 'update') {
          if (updateLog[data.taskId]) {
            updateLog[data.taskId].push(data.log)
          } else {
            updateLog[data.taskId] = [data.log]
          }
        }
        allSend('deployList', updateLog)
      });
      ws.on('disconnect', async function () {
        console.log(ws.id)
        let id = WsOrId[ws.id]
        if (id) {
          await taskModel.updateLog({
            log: updateLog[id],
            id: id
          })
          delete updateLog[id]
          delete WsOrId[ws.id]
          delete IdOrWs[id]
          allSend('deployList', updateLog)
        }
      })
    })
  },
  getWSbyTaskId(id){
    if(IdOrWs[id]){
      return WSS[IdOrWs[id]]
    } {
      return false
    }
  }
}


