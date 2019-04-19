/**
 * Created by arno
 */
var permissionsModel = require('../model/permissions')
module.exports = {
  list: async function (req, res, next) {
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
  update: async function (req, res, next) {

    return res.json({
      code: 1,
      data: {}
    });
  },
  add: async function (req, res, next) {
    var name = req.body.uname
    var password = req.body.password
    if (!name || !password) {
      res.json({
        code: 0,
        msg: '用户名或密码不能为空'
      });
      return
    }
    var Obj = await permissionsModel.add({name, password}).catch(d => {
      res.json({
        code: 0,
        msg: d.sqlMessage
      });
    })
    var id = Obj.insertId
    if(!id){
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
    }
    res.json({
      code: 1,
      data: {}
    });

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
    let Obj =  await permissionsModel.deleteById(id)
    if(Obj){
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