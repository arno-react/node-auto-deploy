/**
 * Created by arno
 */
var userModel = require('../model/user')
var Token = require('../util/token');
var permissionsModel = require('../model/permissions');
let permissionsList = []
module.exports = {
  checkUserName: async function (req, res, next) {
    var name =  req.body.username
    var data = await userModel.checkUserName({name}).catch(d => {
      res.json({
        code: 0,
        msg:d.sqlMessage
      });
    })
    if (data) {
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
    }else{
      res.json({
        code: 1,
        data: {}
      });
    }
  },
  register: async function (req, res, next) {

    var name =  req.body.username
    var data = await userModel.checkUserName({name}).catch(d => {
      res.json({
        code: 0,
        msg:d.sqlMessage
      });
    })
    if (data) {
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
      return
    }
    var password =  req.body.password
    if (!name || !password) {
      res.json({
        code: 0,
        msg: '用户名或密码不能为空'
      });
      return
    }
    password = Token.hashSync(password);
    var data = await userModel.add({name, password}).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
      return
    })
    res.json({
      code: 1,
      data: data
    });
  },
  login: async function (req, res, next) {
    var name =  req.body.username
    var password =  req.body.password
    if (!name || !password) {
      res.json({
        code: 0,
        msg: '请输入用户名或密码'
      });
      return
    }
    var data = await  userModel.getByName(name).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    if(data){
      if(Token.compareSync(data.pwd, password)){
        delete data.pwd
        let token = Token.createToken(data, 60*60*24)
        data.token = token
        let userPer = JSON.parse(data.content)
        let menuResList = []
        if (!permissionsList.length) {
          permissionsList = await permissionsModel.listAndType(0)
        }
        permissionsList.forEach(item => {
          if (userPer.indexOf(item.id) !== -1){
            menuResList.push ({
              title: item.title,
              path: item.api,
              icon: '',
              id: 0
            })
          }
        })

        res.json({
          code: 1,
          data: {
            user:data,
            menuResList: menuResList
          }
        });
        return
      }else{
        res.json({
          code: 0,
          msg: '密码错误'
        });
        return
      }
    }else{
      res.json({
        code: 0,
        msg: '用户不存在'
      });
      return
    }
  },
  logout: function (req, res, next) {
    res.json({
      code: 1,
      data: '登出成功'
    })
  }
}