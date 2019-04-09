/**
 * Created by arno
 */
var userModel = require('../model/user')
var Token = require('../util/token');
module.exports = {
  checkUserName: async function (req, res, next) {
    var name =  req.body.username
    var data = await userModel.checkUserName({name}).catch(d => {
      res.json({
        code: 0,
        msg: d
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
    var password =  req.body.password
    if (!name || !password) {
      res.json({
        code: 0,
        msg: '用户名或密码不能为空'
      });
    }
    password = Token.hashSync(password);
    var data = await userModel.add({name, password}).catch(d => {
      res.json({
        code: 0,
        msg: d
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
        msg: d
      });
    })
    if(data){
      if(Token.compareSync(data.pwd, password)){
        delete data.pwd
        let token = Token.createToken(data, 60*60*24)
        data.token = token
        res.json({
          code: 1,
          data: {
            user:data,
            menuResList: []
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
    req.session.uid = null
    req.session.uname = null
    res.json({
      code: 1,
      data: '登出成功'
    })
  }
}