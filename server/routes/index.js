/**
 * Created by arno
 */


var authRoute = require('./auth');
var home = require('./home');
var setting = require('./setting');
module.exports = function(app){
  app.use('/api', authRoute);
  app.use('/api', function(req, res, next){
     if(req){
       next()
     }else{
       res.json({
         code:'login',
         error:'not login'
       })
     }
  });
  app.use('/api', home);
  app.use('/api', setting);
};