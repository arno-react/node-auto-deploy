var mysql = require('mysql');
var mysqlConf = require('../config/index');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  add: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.add, [data.name, data.password], function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  getById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.getById, id, function (error, result) {
        if (error) reject(error);
        resolve(result ? result[0] : false);
      });
    })
  },
  getByName: function (name) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.getByName, name, function (error, result) {
        if (error) reject(error);
        console.log(result)
        resolve(result ? result[0] : false);
      });
    })
  },
  deleteById: function (id) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.deleteById, id, function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  updatePassword: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.updatePassword, [data.password,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
  checkUserName: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.checkUserName, [data.name], function (error, result) {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    })
  },
};