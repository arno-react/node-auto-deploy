var local = require('../util/local')

function start(cmd, workspace) {
  return local.cmd(cmd, workspace)
}

module.exports = start