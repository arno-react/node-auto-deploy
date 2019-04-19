var userPermissionsSqlMap = {
  add: 'insert into user_permissions (uid,content) values(?, ?)',
  deleteById: 'delete from user_permissions where uid =?',
  update: 'update user_permissions set content=?  where uid=?',
  list: 'select * from user_permissions',
  getById: 'select * from user_permissions where uid =?'
};

module.exports = userPermissionsSqlMap;