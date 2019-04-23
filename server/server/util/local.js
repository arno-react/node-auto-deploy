var sshPool = require('../ssh-pool/index')
var logger = require("./log4j");


var exec = sshPool.exec


module.exports = {
  async removeDir(workspace) {
    return new Promise(async (resolve, reject) => {
      logger.info('remove Dir "%s" start', workspace);
      if (!workspace || workspace === '/') {
        logger.error('remove Dir "%s" not find', workspace);
        reject()
      }
      var cmd = `rm -rf ${workspace}`
      let res = await exec(
        cmd
      ).then(({stdout}) => console.log(stdout))
        .catch(({stderr, stdout}) => {
          logger.error(stderr)
          console.error(stderr)
          reject(stderr)
        });
      logger.info('remove Dir "%s" end', workspace);
      resolve(res)
    })
  },
  async cmd(cmd, workspace) {
    return new Promise(async(resolve, reject) => {
      logger.info('local cmd  "%s"  workspace "%s" start', cmd, workspace);
      if (!workspace || !cmd) {
        logger.error('local cmd  not find workspace or cmd');
        reject()
      }
      let res = await exec(
        cmd, {
          cwd: workspace
        }
      ).catch(({stderr, stdout}) => {
        logger.error(stderr)
        console.error(stderr)
        reject(stderr)
      });
      logger.info('local cmd  "%s"  workspace "%s" end', cmd, workspace);
      resolve(res)
    })
  }

}

// let tmpobj = task.createWorkspace()
// console.log(tmpobj)

// task.branchList('/Users/arno/code/newwork/shipit/testgit', 'test').then((d) => console.log(d))

