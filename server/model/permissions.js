var mysql = require('mysql');
var mysqlConf = require('../config/index');
var permissionsSqlMap = require('./permissionsSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  list: function () {
    return new Promise((resolve, reject) => {
      pool.query(permissionsSqlMap.list, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  listAndType (type) {
    return new Promise((resolve, reject) => {
      pool.query(permissionsSqlMap.listAndType, type, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  add: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(permissionsSqlMap.add, [data.api, data.title,data.type], function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  getById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(permissionsSqlMap.getById, id, function (error, result) {
        if (error) reject(error);
        resolve(result ? result[0] : false);
      });
    })
  },

  deleteById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(permissionsSqlMap.deleteById, id, function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  }
};