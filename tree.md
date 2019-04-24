.
├── README.md
├── api  // 前端接口
│   ├── login.js
│   ├── task.js
│   └── user.js
├── assets // 静态资源
├── components  // 组件
│   ├── Breadcrumb
│   │   └── index.vue
│   ├── Hamburger
│   │   └── index.vue
│   ├── Pagination
│   │   └── index.vue
│   ├── README.md
│   ├── SvgIcon
│   │   └── index.vue
│   ├── downTmp
│   │   └── downTemplate.vue
│   ├── editor.vue
│   ├── history.vue
│   └── taskDetail.vue
├── layouts // ui布局
│   ├── README.md
│   ├── components
│   │   ├── AppMain.vue
│   │   ├── Navbar.vue
│   │   ├── Sidebar
│   │   │   ├── Item.vue
│   │   │   ├── Link.vue
│   │   │   ├── SidebarItem.vue
│   │   │   └── index.vue
│   │   ├── headNav.vue
│   │   └── index.js
│   ├── default.vue
│   ├── empty.vue
│   └── mixin
│       └── ResizeHandler.js
├── log // 日志
├── middleware // 前端中间件
│   ├── README.md
│   └── login.js
├── nuxt.config.js // nuxt 配置
├── package-lock.json
├── package.json
├── pages // 页面
│   ├── 404.vue
│   ├── README.md
│   ├── index.vue
│   ├── login
│   │   └── index.vue
│   └── user.vue
├── plugins  // 插件
│   ├── README.md
│   ├── directive.js
│   ├── element-ui.js
│   ├── icons.js
│   └── socket.js
├── server // 服务器代码
│   ├── config
│   │   └── index.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── homeController.js
│   │   ├── permissController.js
│   │   ├── settingController.js
│   │   └── userController.js
│   ├── index.js
│   ├── model
│   │   ├── permissions.js
│   │   ├── permissionsSqlMap.js
│   │   ├── task.js
│   │   ├── taskList.js
│   │   ├── taskListSqlMap.js
│   │   ├── taskSqlMap.js
│   │   ├── user.js
│   │   ├── userPermissionsSqlMap.js
│   │   ├── userPrmissions.js
│   │   └── userSqlMap.js
│   ├── plugins
│   │   ├── log4j.js
│   │   └── socket.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── home.js
│   │   ├── index.js
│   │   ├── permiss.js
│   │   ├── setting.js
│   │   └── user.js
│   ├── server
│   │   ├── cmd
│   │   │   ├── README.md
│   │   │   ├── branchListTask.js
│   │   │   ├── deleteDirTask.js
│   │   │   ├── historyTask.js
│   │   │   ├── localTask.js
│   │   │   ├── pullTask.js
│   │   │   ├── remoteTask.js
│   │   │   ├── scpTask.js
│   │   │   ├── startTask.js
│   │   │   └── test.js
│   │   ├── cmd.js
│   │   ├── ssh-pool
│   │   │   ├── Connection.js
│   │   │   ├── ConnectionPool.js
│   │   │   ├── README.md
│   │   │   ├── commands
│   │   │   │   ├── cd.js
│   │   │   │   ├── mkdir.js
│   │   │   │   ├── raw.js
│   │   │   │   ├── rm.js
│   │   │   │   ├── rsync.js
│   │   │   │   ├── scp.js
│   │   │   │   ├── ssh.js
│   │   │   │   ├── tar.js
│   │   │   │   └── util.js
│   │   │   ├── index.js
│   │   │   ├── remote.js
│   │   │   └── util.js
│   │   └── util
│   │       ├── argv.js
│   │       ├── git.js
│   │       ├── local.js
│   │       ├── log4j.js
│   │       ├── remote.js
│   │       └── ws.js
│   ├── sql
│   │   └── auto_deploy_2019-04-19.sql
│   └── util
│       ├── mysql.js
│       ├── startCmd.js
│       └── token.js
├── static // 
│   ├── README.md
│   └── favicon.ico
├── store //数据
│   ├── README.md
│   ├── actions.js
│   ├── app.js
│   ├── index.js
│   ├── mutation-types.js
│   ├── mutations.js
│   └── user.js
└── utils // 工具
    ├── auth.js
    ├── index.js
    ├── request.js
    ├── scrollTo.js
    └── validate.js