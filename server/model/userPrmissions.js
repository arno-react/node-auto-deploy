var mysql = require('mysql');
var mysqlConf = require('../config/index');
var userPermissionsSqlMap = require('./userPermissionsSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  list: function () {
    return new Promise((resolve, reject) => {
      pool.query(userPermissionsSqlMap.list, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  add: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userPermissionsSqlMap.add, [data.uid, data.content], function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  getById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(userPermissionsSqlMap.getById, id, function (error, result) {
        if (error) reject(error);
        resolve(result ? result[0] : false);
      });
    })
  },
  deleteById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(userPermissionsSqlMap.deleteById, id, function (error, result) {
        if (error) reject(error);
        resolve(result &&  result.affectedRows > 0);
      });
    })
  },
  update: function (data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      pool.query(userPermissionsSqlMap.update, [data.content, data.uid], function (error, result) {
        console.log('error',error)
        if (error) reject(error);
        console.log('result',result)
        resolve(result && result.affectedRows > 0);
      });
    })
  },
};