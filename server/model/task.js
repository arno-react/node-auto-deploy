var mysql = require('mysql');
var mysqlConf = require('../config/index');
var taskSqlMap = require('./taskSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  List:function (pid) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.list, pid, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  add: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.add, [data.num, data.pid, data.store_url, data.cmd, data.status, "[]", data.workspace], function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  getById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.getById, id, function (error, result) {
        if (error) reject(error);
        resolve(result[0]);
      });
    })
  },
  deleteById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.deleteById, id, function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateStatus: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.updateStatus, [data.status,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateLog: async function (data) {
    var res = await this.getById(data.id)
    let log = JSON.parse(res.log)
    if(typeof data.log === 'string' ){
      log.push(data.log)
    }else{
      log = log.concat(data.log)
    }
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.updateLog, [JSON.stringify(log),data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateStopUid: async function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.updateStopUid, [data.uid,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateStatusAndLog: async function (data) {
    // var res = await this.getById(data.id)
    // let log = data.log
    // if(res.log){
    //   log = JSON.parse(res.log)
    // }
    // log.push(data.log)
    return new Promise((resolve, reject) => {
      pool.query(taskSqlMap.updateStatusAndLog, [JSON.stringify(data.log),data.status,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
};