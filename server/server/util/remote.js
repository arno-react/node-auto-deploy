var sshPool = require('../ssh-pool/index')
var logger = require("./log4j");

var Connection  = sshPool.Connection
let connection ={}

module.exports = {
  init(remote, remotePassword) {
    connection = new Connection({
      remote: remote, //'root@118.24.156.247:22',
      password: remotePassword, //'xiao@chen100200',
      log: (...args) => logger.info(...args),
    })
  },
  async copyToRemote (src, dest, options){
    logger.info('scp  "%s" to "%s" start', src,dest );
    var res = await connection.copyToRemote(src, dest, options).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('scp  "%s" to "%s" end', src,dest );
    return res
  },
  async run (cmd, workspace){
    logger.info('run  "%s"  workspace "%s" start',cmd, workspace );
    var res = await connection.run(cmd, {
      cwd: workspace
    }).catch(({stderr, stdout}) => {
      logger.error(stderr)
      console.error(stderr)
    });
    logger.info('run  "%s"  workspace "%s"  end',cmd, workspace  );
    return res
  }

}


