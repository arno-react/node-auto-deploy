var mysql = require('mysql');
var mysqlConf = require('../config/index');
var taskListSqlMap = require('./taskListSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  add: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.add, [data.title, data.des,data.uid, data.store_url, data.store_type, data.content, data.workspace], function (error, result) {
        if (error) reject(error);
        console.log(result)
        resolve(result);
      });
    })
  },
  list: function () {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.list, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  getById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.getById, id, function (error, result) {
        if (error) reject(error);
        resolve(result[0]);
      });
    })
  },
  deleteById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.deleteById, id, function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  update: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.update, [data.num,data.status,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateNum: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.updateNum, [data.num,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updateStatus: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(taskListSqlMap.updateStatus, [data.status,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  }
};