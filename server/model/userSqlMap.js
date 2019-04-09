var userSqlMap = {
  add: 'insert into user (uname,pwd) values(?, ?)',
  deleteById: 'delete from user where id =?',
  getByName: 'select * from user where uname =?',
  updatePassword: 'update task set pwd=?  where id=?',
  list: 'select * from user',
  getById: 'select * from user where id =?',
  checkUserName: 'select * from user where uname =?',
};

module.exports = userSqlMap;