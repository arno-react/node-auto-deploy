let fork = require('child_process').fork;
const execFile = require('child_process').execFile;
let taskObj = {}
module.exports = {
  getAllTask: function () {
    return taskObj
  },
  addTask: function (name, type, params) {
    return new Promise((resolve, reject) =>{
      console.log(params)
      execFile('node', [`./server/server/cmd.js`,'--type',type,'--name',name,'--params',JSON.stringify(params)], (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({stdout,stderr})
      });
    })
  },
  closeTask: function (name) {
    if (taskObj[name]) {
      taskObj[name].kill()
      delete taskObj[name]
      return {
        name: name,
        code: 1
      }
    } else {
      return {
        name: name,
        code: 0,
        msg : '任务不存在'
      }
    }


    // require('child_process').exec(`kill -9 ${data.pid}`, {encoding: 'utf-8'}, function (err, stdout, stderr) {
    //   if (err) {
    //     console.log(err.stack);
    //     console.log('Error code: ' + err.code);
    //     console.log('Signal received: ' + err.signal);
    //   }
    //   //console.log(err, stdout, stderr);
    //   console.log('data : ' + stdout);
    // }).on('exit', function (code) {
    //   console.log('子进程已退出, 退出码 ' + code);
    // });
  }
}