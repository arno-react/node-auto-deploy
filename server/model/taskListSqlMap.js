var taskListSqlMap = {
  add: 'insert into task_list (title, des,uid,store_url,store_type,content,workspace) values(?, ?,?, ?, ?, ?, ?)',
  deleteById: 'delete from task_list where id = ?',
  update: 'update task_list set num=?,status=?  where id=?',
  updateNum: 'update task_list set num=?  where id=?',
  updateStatus: 'update task_list set status=?  where id=?',
  list: 'select * from task_list',
  getById: 'select * from task_list where id =?'
};

module.exports = taskListSqlMap;