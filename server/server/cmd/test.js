// var sshPool = require('../ssh-pool/index')
// var Connection  = sshPool.Connection
// const connection = new Connection({
//   remote: 'root@118.24.156.247:22',
//   password:'xiao@chen100200',
//   log: (...args) => console.log(...args),
// })
//
//
// var exec = sshPool.exec
//
// connection.run('pwd').then((res) => console.log(res.stdout)).catch((res) => console.error(res.stderr))
//
// exec(
//    'yum install -y wget && wget http://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz && tar xvzf sshpass-1.06.tar.gz && cd ./sshpass-1.06 && ./configure && make && make install'
//   ).then(({ stdout }) => console.log(stdout))
//   .catch(({ stderr, stdout }) => console.error('error',stderr))

var path = require('path')
let workspace = '/var/a/b'
let src = './b/s'
src =  path.resolve( workspace , src )
console.log(src)