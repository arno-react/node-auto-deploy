var mysql = require('mysql');
var config = require('../config/index');

/**
 * 配置MySql
 */
var connection = mysql.createConnection(config.mysql);
connection.connect();

module.exports = {
  connection: connection,
  getValue:async function(content,contact){
    var selectSQL = "select * from auto_reply where uid = '"+uid +"'";
    connection.query(selectSQL,function (err,rs) {
      if(rs && rs.length >0){
        var c = []
        rs.forEach((item)=>{
          if(item.type == 1 && item.key == content ){
            c.push(item.value)
          }
          if(item.type == 2 && content.indexOf(item.key) != -1){
            c.push(item.value)
          }
        })
        if(c.length>0){
          contact.say(c.join(','))
        }
      }
    })
  },
  friend:function(request,contact,fileHelper){
    var selectSQL = "select * from user where uid = '"+uid +"'";
    connection.query(selectSQL,function (err,rs) {
      var logMsg = ''
      if(rs && rs.length >0){
        /**
         *
         * 1. New Friend Request
         *
         * when request is set, we can get verify message from `request.hello`,
         * and accept this request by `request.accept()`
         */
        if (request.hello == rs[0].friend || !rs[0].friend) {
          logMsg = '好友验证通过 验证信息：'+ request.hello
          var sta = request.accept()
          if(sta){
            socket.emit('addDone', {from:contact.get('name'),to:userObj.get('name'),uid:uid})
          }

        } else {
          logMsg = '好友验证不通过 验证信息：' + request.hello
        }
        if(logMsg){
          fileHelper.say(logMsg)
        }
      }
    })
  },
}