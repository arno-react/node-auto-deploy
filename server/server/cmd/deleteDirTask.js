
var local = require('../util/local')
var argv = require('../util/argv')
var params = argv.params || {}
async  function start () {
  await local.removeDir(params.workspace)
  process.exit(0)
}
module.exports =  start
// git.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))
