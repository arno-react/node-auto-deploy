# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.17)
# Database: auto_deploy
# Generation Time: 2019-04-19 07:43:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api` varchar(30) NOT NULL DEFAULT '',
  `title` varchar(30) NOT NULL DEFAULT '',
  `type` int(1) NOT NULL DEFAULT '0',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;

INSERT INTO `permissions` (`id`, `api`, `title`, `type`, `createTime`)
VALUES
	(1,'/','首页',0,'2019-04-18 15:45:09'),
	(2,'/user','用户管理',0,'2019-04-18 15:45:26'),
	(3,'/taskList.json','查看任务列表',1,'2019-04-18 15:46:28'),
	(4,'/delTask.json','删除任务',1,'2019-04-18 15:46:59'),
	(5,'/addTask.json','新增任务',1,'2019-04-18 15:47:14'),
	(6,'/checkGitInfo.json','拉取git分支',1,'2019-04-18 15:47:35'),
	(7,'/taskDetail.json','查看任务',1,'2019-04-18 15:48:44'),
	(8,'/startTask.json','执行任务',1,'2019-04-18 15:49:00'),
	(9,'/stopTask.json','停止任务',1,'2019-04-18 15:49:14'),
	(10,'/performTaskList.json','查看任务日志列表',1,'2019-04-18 15:49:44'),
	(11,'/performTaskDetail.json','查看任务日志',1,'2019-04-18 15:49:59'),
	(12,'/userList.json','查看用户列表',1,'2019-04-18 15:50:32'),
	(13,'/userUpdate.json','修改用户',1,'2019-04-18 15:50:47'),
	(14,'/userAdd.json','新增用户',1,'2019-04-18 15:51:12'),
	(15,'/userDel.json','删除用户',1,'2019-04-18 15:51:37');

/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '项目任务次数',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '项目任务id',
  `start_uid` int(11) NOT NULL DEFAULT '0' COMMENT '启动用户id',
  `stop_uid` int(11) DEFAULT NULL COMMENT '停止用户id',
  `store_url` varchar(255) NOT NULL DEFAULT '' COMMENT '仓库地址',
  `cmd` text NOT NULL COMMENT '任务cmd json 数据',
  `log` text NOT NULL COMMENT '任务log json 数据',
  `workspace` varchar(255) NOT NULL DEFAULT '',
  `update` text,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '任务状态 0 执行中 1完成',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
UNLOCK TABLES;

# Dump of table task_list
# ------------------------------------------------------------

DROP TABLE IF EXISTS `task_list`;

CREATE TABLE `task_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '标题',
  `des` varchar(30) NOT NULL DEFAULT '' COMMENT '描述',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `store_url` varchar(255) NOT NULL DEFAULT '' COMMENT '仓库地址',
  `store_type` int(1) NOT NULL DEFAULT '0' COMMENT '仓库类型 0 git 1 svn',
  `branch` varchar(30) NOT NULL DEFAULT '' COMMENT '分支',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '任务执行次数',
  `content` text NOT NULL COMMENT '任务cmd json 数据',
  `workspace` varchar(200) NOT NULL DEFAULT '' COMMENT '任务工作目录',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '任务状态 0 没有执行 1执行中',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `task_list` WRITE;
/*!40000 ALTER TABLE `task_list` DISABLE KEYS */;

INSERT INTO `task_list` (`id`, `title`, `des`, `uid`, `store_url`, `store_type`, `branch`, `num`, `content`, `workspace`, `status`, `createTime`)
VALUES
	(180,'mms企业后管','测试环境',0,'http://192.168.1.249/front/H5/mall-super.git',0,'master',7,'{\"store_url\":\"http://192.168.1.249/front/H5/mall-super.git\",\"store_user\":\"chenxiao\",\"store_password\":\"xiaochen100200\",\"store_type\":0,\"branch\":\"master\",\"cmd\":[{\"type\":0,\"cmd\":\"npm run test\",\"workspace\":\"\"},{\"type\":1,\"src\":\"./dist/\",\"dest\":\"/usr/local/nginx/html/h5/mall-platform-web\",\"remote\":\"root@192.168.1.248:22\",\"remote_password\":\"h2finance\"}]}','/var/folders/ml/k94lrmyn2bvgf50k_zmhxr700000gn/T/tmp-48192Kh188s6cdZan',0,'2019-04-11 18:03:03');

/*!40000 ALTER TABLE `task_list` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(30) NOT NULL,
  `pwd` varchar(255) NOT NULL DEFAULT '',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`uid`, `uname`, `pwd`, `createTime`)
VALUES
	(169,'admin','XtQjMvbXvuzAjhg5ZCn4l7ahDoYW+YBcJY6IeXj4Cgg=','2019-04-09 10:17:13');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_permissions`;

CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `content` varchar(300) NOT NULL DEFAULT '',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `account_Index` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;

INSERT INTO `user_permissions` (`id`, `uid`, `content`, `createTime`)
VALUES
	(1,169,'[1,2,3,4,5,6,7,8,12,13,14,15]','2019-04-18 15:03:00');

/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
