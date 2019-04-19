/**
 * Created by arno
 */


var authRoute = require('./auth');
var home = require('./home');
var setting = require('./setting');
var user = require('./user');
var Token = require('../util/token');
module.exports = function(app){
  app.use('/api', authRoute);
  app.use('/api', function(req, res, next){
     let token =req.headers.token
     if(token && Token.checkToken(token)){
       next()
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