var remote = require('../util/remote')
  function start (cmd, remoteUrl,remotePassword,workspace, ) {
   remote.init(remoteUrl, remotePassword)
  return remote.run (cmd, workspace)
}
module.exports =  start