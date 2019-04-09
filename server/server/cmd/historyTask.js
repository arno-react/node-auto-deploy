var git = require('../util/git')

function start( workspace) {
  return git.history(workspace)
}
module.exports = start