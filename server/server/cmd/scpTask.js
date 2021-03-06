
var remote = require('../util/remote')
var path = require('path')

function copyToRemote(remoteUrl, remotePassword, workspace, src, dest) {
  remote.init(remoteUrl, remotePassword)
  let url = src
  if (!path.isAbsolute(src)){
    url =  path.resolve( workspace , src )
  }
  if(src[src.length -1] === '/'){
    url = url + '/'
  }
  return remote.copyToRemote(url, dest, {
    cwd: workspace
  })
}

function copyFromRemote(remoteUrl, remotePassword, workspace, src, dest) {
  remote.init(remoteUrl, remotePassword)
  let url = src
  if (!path.isAbsolute(src)){
    url =  path.resolve( workspace , src )
  }
  if(src[src.length -1] === '/'){
    url = url + '/'
  }
  return remote.copyFromRemote(url, dest, {
    cwd: workspace
  })
}

module.exports = {
  copyToRemote,
  copyFromRemote
}
