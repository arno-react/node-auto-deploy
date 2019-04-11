/**
 * Created by arno
 */
var taskListModel = require('../model/taskList')
var startCmd = require('../util/startCmd')
module.exports = {
  list: async function (req, res, next) {
   let d =  await taskListModel.list()
    res.json({
      code: 1,
      data: d
    })
  },
  delTask: async function (req, res, next) {
    var id = req.body.id
    if (!id && id !== 0) {
      res.json({
        code: 0,
        msg: '参数错误'
      })
      return
    }
    let r =  await taskListModel.getById(id)
    await startCmd.addTask('deleteDir', 3, r).catch((d) => {
      res.json({
        code: 0,
        msg: d
      })
    })
    let d =  await taskListModel.deleteById(id)
    if(d){
      res.json({
        code: 1,
        data: d
      })
    }else{
      res.json({
        code: 0,
        msg: '删除失败'
      })
    }

  },

}