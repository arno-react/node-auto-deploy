
var git = require('../util/git')
var local = require('../util/local')
var argv = require('../util/argv')
var params = argv.params || {}
async  function start () {
  var dir = await git.createWorkspace()
  await git.initRepository(dir.name)
  await git.addRemote(dir.name,params.store_url,params.store_user, params.store_password)
  await git.fetch(dir.name, params.store_url)
  var res = await git.branchList(dir.name, params.store_url)
  console.log(res)
  await local.removeDir(dir.name)
  process.exit(0)
}
module.exports =  start
// git.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))
