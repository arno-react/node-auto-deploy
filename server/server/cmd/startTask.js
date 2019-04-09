
var pullTask = require('./pullTask')
var scpTask = require('./scpTask')
var localTask = require('./localTask')
var remoteTask = require('./remoteTask')
var logger = require("../util/log4j");
var argv = require('../util/argv')
var params = argv.params || {}

var runCmd = async arr => {
  let item = arr.shift()
  if (item.type === 0) {
    await localTask(item.cmd, item.workspace || params.workspace)
  } else if (item.type === 1) {
    if (item.cmd == '-scp-') {
      await scpTask(params.remote, params.remote_password, item.workspace || params.workspace, item.src, item.dest)
    } else {
      await remoteTask(item.cmd, item.workspace)
    }
  }
  if(arr.length){
    runCmd(arr)
  }else {
    logger.info('task end');
    setTimeout(()=>{
      process.exit(0)
    },100)
  }

}

async function start() {
  await pullTask()
  // params.cmd.forEach()
  runCmd(params.cmd)
  return {}
}
module.exports =  start
// git.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))
