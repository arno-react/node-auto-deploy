var taskListSqlMap = {
  add: 'insert into task (num, pid,start_uid, store_url,cmd,status,log,workspace) values(?, ?, ?, ?, ?, ?, ?, ?)',
  deleteById: 'delete from task where id = ?',
  updateLog: 'update task set log=?  where id=?',
  updateStatus: 'update task set status=?  where id=?',
  updateStopUid: 'update task set stop_uid=?  where id=?',
  updateStatusAndLog: 'update task set log=?,status=?  where id=?',
  list: 'select task.* , user.uname from task left join user on task.start_uid = user.uid where pid=?',
  getById: 'select * from task where id = ?'
};

module.exports = taskListSqlMap;