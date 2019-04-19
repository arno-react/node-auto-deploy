var permissionsSqlMap = {
  add: 'insert into permissions (api,title,type) values(?, ?, ?)',
  deleteById: 'delete from permissions where id =?',
  list: 'select * from permissions',
  listAndType: 'select * from permissions where type =?',
  getById: 'select * from permissions where id =?',
};

module.exports = permissionsSqlMap;