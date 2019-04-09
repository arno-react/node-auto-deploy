
/**
 *  type
 *      1 branchListTask
 *      2 init
 *      3 deleteDirTask
 *      4
 * **/
var argv = require('./util/argv')
var logger = require('./util/log4j')
logger.init ({name: argv.name, params: argv.params})
var branchListTask = require('./cmd/branchListTask')
var pullTask = require('./cmd/pullTask')
var deleteDirTask = require('./cmd/deleteDirTask')
var startTask = require('./cmd/startTask')

let  params =  argv.params
logger.info('cmd start type "%s"  params "%s"',argv.type ,JSON.stringify(params))
 if(argv.type == 1){
   branchListTask()
 } else if(argv.type == 2){
   pullTask(true)
 } else if(argv.type == 3){
   deleteDirTask()
 } else if(argv.type == 4){
   startTask()
 }






