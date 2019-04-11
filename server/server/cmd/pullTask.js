
var git = require('../util/git')
var argv = require('../util/argv')
var params = argv.params || {}
async  function start (stop) {
  await git.initRepository(params.workspace)
  await git.addRemote(params.workspace,params.store_url,params.store_user, params.store_password)
  await git.fetch(params.workspace, params.store_url)
  await git.pull(params.branch,params.workspace)
  await git.checkout(params.branch,params.workspace)
  await git.pull(params.branch,params.workspace)
  if (stop) {
    process.exit(0)
  }
}
module.exports =  start
// git.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))
