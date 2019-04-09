// --p  password
// --u  userName
// --path  repositoryUrl
// --b  branch

module.exports = (function () {
  let argv = process.argv
  let obj = {}
  let i = -1
  i = argv.indexOf('--type')
  if (i !== -1 && argv[i + 1].indexOf('--') !== 0) {
    obj.type = argv[i + 1]
  }
  i = argv.indexOf('--params')
  if (i !== -1 && argv[i + 1].indexOf('--') !== 0) {
    obj.params = JSON.parse(argv[i + 1])
  }
  i = argv.indexOf('--name')
  if (i !== -1 && argv[i + 1].indexOf('--') !== 0) {
    obj.name = argv[i + 1]
  }
  return obj
})()