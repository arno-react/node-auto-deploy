/**
 * Created by arno
 */
var userModel = require('../model/user')
var userPrmissionsModel = require('../model/userPrmissions')
var permissionsModel = require('../model/permissions')
var Token = require('../util/token');
module.exports = {
  permissList: async function (req, res, next) {
    var data = await permissionsModel.list().catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    res.json({
      code: 1,
      data: data
    });
  },
  list: async function (req, res, next) {
    var data = await userModel.listAndPer().catch(d => {
      return res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    return res.json({
      code: 1,
      data: data
    });
  },
  update: async function (req, res, next) {
    var name = req.body.uname
    var password = req.body.password
    var uid = req.body.uid
    var content = JSON.stringify(req.body.content|| [])
    var data = await userModel.getById(uid).catch(d => {
      return res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    if (name || password) {
      if (password) {
        password = Token.hashSync(password);
      }else {
        password = data.pwd
      }
      if (name && name !== data.uname) {
        var checkUserNameObj = await userModel.checkUserName({name}).catch(d => {
          return res.json({
            code: 0,
            msg: d.sqlMessage
          });
        })
        if (checkUserNameObj) {
          return res.json({
            code: 0,
            msg: '用户名已存在'
          });
        }
      }else{
        name = data.uname
      }
      var upUser = await userModel.update({uid, name, password }).catch(d => {
        return res.json({
          code: 0,
          msg: d.sqlMessage
        });
      })
      if (!upUser) {
        return res.json({
          code: 0,
          msg: '修改失败'
        });

      }
    }
    var p = {
      uid: uid,
      content: content
    }
    var userPrmObj = await userPrmissionsModel.getById(uid).catch(d => {
      return res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    var userPrmissionsObj
    if (userPrmObj) {
       userPrmissionsObj = await userPrmissionsModel.update(p).catch(d => {
        return res.json({
          code: 0,
          msg: d.sqlMessage
        });
      })
    } else {
      userPrmissionsObj = await  userPrmissionsModel.add(p).catch(d => {
        res.json({
          code: 0,
          msg: d.sqlMessage
        });
      })
    }

    if (!userPrmissionsObj) {
     return res.json({
        code: 0,
        msg: '修改失败'
      });
    }
    return res.json({
      code: 1,
      data: {}
    });
  },
  add: async function (req, res, next) {
    var name = req.body.uname
    var password = req.body.password
    var content = JSON.stringify(req.body.content|| [])
    if (!name || !password) {
      res.json({
        code: 0,
        msg: '用户名或密码不能为空'
      });
      return
    }
    var data = await userModel.checkUserName({name}).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    if (data) {
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
      return
    }
    password = Token.hashSync(password);
    var addUser = await userModel.add({name, password}).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    var uid = addUser.insertId
    if(!uid){
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
    }
    var p = {
      uid: uid,
      content: content
    }
    var updateP = await  userPrmissionsModel.add(p).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    if(updateP){
      res.json({
        code: 1,
        data: {}
      });
    }

  },
  del: async function (req, res, next) {
    var id = req.body.id
    if (!id && id !== 0) {
      res.json({
        code: 0,
        msg: '参数错误'
      })
      return
    }
    let userObj  =  await userModel.deleteById(id)
    let userPrmObj =  await userPrmissionsModel.deleteById(id)
    if(userObj && userPrmObj ){
      res.json({
        code: 1,
        data: {}
      })
    }else{
      res.json({
        code: 0,
        msg: '删除失败'
      })
    }

  },
}