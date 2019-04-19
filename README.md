# auto-deploy

> node auto deploy  项目使用 Nuxt  express  element 




### 安装
-   程序需要ssh 要用 password 登录  要装sshpass

```sh
yum install -y wget && wget http://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz && tar xvzf sshpass-1.06.tar.gz && cd ./sshpass-1.06 && ./configure && make && make install
```
-   修改数据库配置 /server/config/index.js 
```javascript
module.exports = {
  mysql:{
    host  : '127.0.0.1',
    user  : 'root',
    password : '123456',
    database : 'auto_deploy',
    port:'3306'
  }
};
```
-  导入sql到数据库  sql文件在 /server/sql/iauto_deploy_2019-04-19.sql

-   Build Setup
``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
