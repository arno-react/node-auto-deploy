var sshPool = require('../ssh-pool/index')
var logger = require("./log4j");

var tmp = require('tmp');
var fs = require("fs");
var path = require("path");

var exec = sshPool.exec

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err){
        resolve(false);
      }else{
        resolve(stats);
      }
    })
  })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir){
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if(err){
        resolve(false);
      }else{
        resolve(true);
      }
    })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
  let isExists = await getStat(dir);
  logger.info('Workspace isExists %s ',isExists)
  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return dir;
  } else if (isExists) {     //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir;      //拿到上级路径
  logger.info('isWorkspace tempDir %s ',tempDir)
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}



module.exports = {
  async createWorkspace(workspace) {
    if (workspace){
      logger.info('isWorkspace %s start',workspace,)
      let res = await dirExists(workspace)
      logger.info('workspace %s is end',workspace)
      return res
    } else {
      var obj = tmp.dirSync();
      // console.log('Dir: ', tmpobj.name);
      // Manual cleanup
      // tmpobj.removeCallback();
      return obj
    }

  },
  async initRepository(workspace) {
    logger.info('Initialize local repository in "%s"', workspace);
    var cmd = 'git init'
    let res = exec(
      cmd,
      {
        cwd: workspace
      }
    ).catch(({stderr, stdout}) => console.error('error', stderr))
    logger.info('Repository initialized.');
    return res
  },
  addRemote(workspace, repositoryUrl, userName, password) {
    return new Promise((resolve, reject) => {
      logger.info('List local remotes. %s',workspace);
      exec('git remote', {
        cwd: workspace
      }).then((res) => {
        const remotes = res.stdout ? res.stdout.split(/\s/) : [];
        const method = remotes.indexOf('deploy') !== -1 ? 'set-url' : 'add';
        logger.info('Update remote "%s" to local repository "%s"', repositoryUrl, workspace); // Update remote.
        let strAr = repositoryUrl.split('//')

        let urlAr = []
        if (strAr.length === 2) {
          urlAr.push(strAr[0])
          urlAr.push('//')
          if (userName && password) {
            urlAr.push(encodeURIComponent(userName))
            urlAr.push(':')
            urlAr.push(encodeURIComponent(password))
            urlAr.push('@')
          }
          urlAr.push(strAr[1])
        } else {
          reject({
            code: 0,
            msg: 'git 地址不正确'
          })
        }
        let url = urlAr.join('')
        // logger.info('Update remote "%s" to local repository "%s"', url, workspace); // Update remote.
        exec(`git remote ${method} deploy ${url}`, {
          cwd: workspace
        }).then((res) => resolve(res))
          .catch(({stderr, stdout}) => console.error(stderr));
        logger.info('Remote updated.');

      })
        .catch(({stderr, stdout}) => {
          logger.error(stderr)
          console.error(stderr)
        });
    })

  },
  async fetch(workspace, repositoryUrl, shallowClone) {
    let fetchCommand = 'git fetch deploy --prune';
    const fetchDepth = shallowClone ? ' --depth=1' : ''; // fetch branches and tags separate to be compatible with git versions < 1.9

    fetchCommand += `${fetchDepth} && ${fetchCommand} "refs/tags/*:refs/tags/*"`;
    logger.info('Fetching repository "%s" start', repositoryUrl);
    let res = await exec(fetchCommand, {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('Repository fetched.');
    return res
  },
  async branchList(workspace, repositoryUrl) {
    let fetchCommand = 'git branch -r';
    logger.info('"%s" branchList start', repositoryUrl);
    let res = await exec(fetchCommand, {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('"%s" branchList end.', repositoryUrl);
    let data = (res.stdout ? res.stdout.split(/\s/) : []).filter(d => d).join('\n');
    logger.info('res %s',data)
    return data;
  },

  async checkout(branch, workspace) {
    logger.info('Checking out commit-ish "%s"', branch);
    let res = await exec(`git checkout ${branch}`, {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('Checked out.');
    return res
  },
  async pull(branch, workspace) {
    logger.info('pull start');
    let res = await exec(`git pull deploy ${branch}`, {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('pull end');
    return res
  },
  async updateSubmodules(workspace) {
    logger.info('Updating submodules.');
    let res = await exec('git submodule update --init --recursive', {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('Submodules updated');
    return res
  },
  async history(workspace) {
    logger.info('git log start');
    let res = await exec('git log --pretty=format:"%h-- %an--%ad--%s"', {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('git log end');
    logger.info('res %s',res)
    return res
  }
}

// let tmpobj = task.createWorkspace()
// console.log(tmpobj)

// task.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))

