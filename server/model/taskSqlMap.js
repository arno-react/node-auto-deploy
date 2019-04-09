var taskListSqlMap = {
  add: 'insert into task (num, pid, store_url,cmd,status,log,workspace) values(?, ?, ?, ?, ?, ?, ?)',
  deleteById: 'delete from task where id = ?',
  updateLog: 'update task set log=?  where id=?',
  updateStatus: 'update task set status=?  where id=?',
  updateStopUid: 'update task set stop_uid=?  where id=?',
  StatusAndLog: 'update task set log=?,status=?  where id=?',
  list: 'select * from task',
  getById: 'select * from task where id = ?'
};

module.exports = taskListSqlMap;