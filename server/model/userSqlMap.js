var userSqlMap = {
  add: 'insert into user (uname,pwd) values(?, ?)',
  deleteById: 'delete from user where uid =?',
  getByName: 'select user.*, user_permissions.content from user left join user_permissions on user.uid = user_permissions.uid where uname =?',
  updatePassword: 'update user set pwd=?  where uid=?',
  update: 'update user set uname=? ,pwd=?  where uid=?',
  list: 'select * from user',
  getById: 'select * from user where uid =?',
  checkUserName: 'select * from user where uname =?',
  listAndPer: 'select user.uid, user.uname, user.createTime, user_permissions.content from user left join user_permissions on user.uid = user_permissions.uid'
};

module.exports = userSqlMap;