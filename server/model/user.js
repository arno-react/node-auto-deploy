var mysql = require('mysql');
var mysqlConf = require('../config/index');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
  list: function () {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.list, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
  listAndPer: function () {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.listAndPer, function (error, result) {
        if (error) reject(error);
        resolve(result);
      });
    })
  },
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
        console.log(result)
        resolve(result && result.affectedRows > 0);
      });
    })
  },
  update: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.update, [data.name, data.password,data.uid], function (error, result) {
        if (error) reject(error);
        resolve(result &&  result.affectedRows > 0);
      });
    })
  },
  updatePassword: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.updatePassword, [data.password,data.id], function (error, result) {
        if (error) reject(error);
        resolve(result && result.affectedRows > 0);
      });
    })
  },
  checkUserName: function (data) {
    return new Promise((resolve, reject) => {
      pool.query(userSqlMap.checkUserName, [data.name], function (error, result) {
        if (error) reject(error);
        resolve(result && result.affectedRows > 0);
      });
    })
  },
};