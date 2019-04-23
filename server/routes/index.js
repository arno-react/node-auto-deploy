/**
 * Created by arno
 */


var authRoute = require('./auth');
var home = require('./home');
var setting = require('./setting');
var user = require('./user');
var permiss = require('./permiss');
var Token = require('../util/token');
var permissionsModel = require('../model/permissions');
let permissionsObj = {}
module.exports = function(app){
  app.use('/api', authRoute);
  app.use('/api', permiss);
  app.use('/api',async function(req, res, next){
     let token =req.headers.token
     if(token && Token.checkToken(token)){
       let userObj =  Token.decodeToken(token)
       let userPer = JSON.parse(userObj.payload.data.content)
       if (!Object.keys(permissionsObj).length) {
         var permissionsList = await permissionsModel.listAndType(1)
         permissionsList.forEach(item => {
           permissionsObj[item.api] = item.id
         })
       }
       if (userPer.indexOf(permissionsObj[req.path]) !== -1){
         req.userObj = userObj.payload.data
         next()
       } else {
         res.json({
           code: 0,
           msg:'嘿！这不是你可以动的哦。你没有权限'
         })
       }

     }else{
       res.json({
         code: 0,
         errorCode: 1,
         msg:'not login'
       })
     }
  });
  app.use('/api', home);
  app.use('/api', setting);
  app.use('/api', user);
};