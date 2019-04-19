<template>
    <section class="container ">
        <div class="task-list">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户列表</span>
                    <el-button style="float: right; padding: 3px 0" type="text"   v-permiss="'/userAdd.json'" @click.native.prevent="addUser()"> 新增
                    </el-button>
                </div>

                <el-table
                        :data="userList"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="uid"
                            label="id"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="uname"
                            label="用户名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="权限"
                            width="420">
                        <template slot-scope="scope">
                            <el-tag size="medium"  v-for="item in scope.row.content" :key="item">{{ item |  permissions(permissList)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button
                                    v-permiss="'/userDel.json'"
                                    @click.native.prevent="delUser(scope.row.uid)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                            <el-button
                                    v-permiss="'/userUpdate.json'"
                                    @click.native.prevent="editorUser(scope.row)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <el-dialog :title="title" :visible="visible" width="70%" @close="cancel">
            <el-form :model="from" label-width="100px">
                <el-input v-model="from.uid" v-show="false"></el-input>
                <el-form-item label="用户名">
                    <el-input v-model="from.uname" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="from.password" placeholder="请输入密码"></el-input>
                    <div>如是修改用户，不修改密码可不填写</div>
                </el-form-item>
                <el-form-item label="权限">
                    <!--<el-transfer v-model="from.content" :data="permissList"></el-transfer>-->
                    <el-transfer
                            style="text-align: left; display: inline-block"
                            v-model="from.content"
                            filterable
                            :titles="['可选权限', '已选权限']"
                            :button-texts="['到左边', '到右边']"
                            :format="{
                                    noChecked: '${total}',
                                    hasChecked: '${checked}/${total}'
                                  }"
                            @change="handleChange"
                            :data="permissList">
                        <span slot-scope="{ option }">{{ option.id }} - {{ option.title }} - {{ option.type === 0 ? '页面' :'接口' }}</span>
                    </el-transfer>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ok" >确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
  import * as User from '../api/user'

  export default {
    data() {
      return {
        percentage: 0,
        visible: false,
        title: '',
        from: {
        }
      }
    },
    components: {
    },
    mounted() {
      this.init()
    },
    computed: {
      userList() {
        return this.$store.state.userList
      },
      permissList() {
        return this.$store.state.permissList
      }
    },
    methods: {
      init() {
        this.$store.dispatch('userList')
        this.$store.dispatch('permissList')
      },
      delUser(id) {
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          User.delUser(id).then(data => {
            if (data.code === 1) {
              this.$message({
                message: '用户删除成功',
                type: 'success'
              });
              this.init()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editorUser(row) {
        this.visible = true
        this.title = '修改'
        this.from = JSON.parse(JSON.stringify(row))
      },
      addUser() {
        this.visible = true
        this.from = {
          uname: '',
          password: '',
          content: []
        }
        this.title = '新增'
      },
      cancel() {
        this.visible = false
        this.title = ''
        this.from = {
          uname: '',
          password: '',
          content: []
        }
      },
      ok () {
        let data = {
          uname: this.from.uname,
          password: this.from.password,
          content: this.from.content,
          uid: this.from.uid,
        }
        if(data.uid){
          User.updateUser(data).then(res => {
            if(res.code === 1){
              this.$message({
                message: '用户修改成功',
                type: 'success'
              });
              this.init()
              this.cancel()
            }
          })
        }else{
          if(!data.uname){
            this.$message({
              type: 'info',
              message: '请输入用户名'
            })
            return
          }
          if(!data.password){
            this.$message({
              type: 'info',
              message: '请输入密码'
            })
            return
          }
          User.addUser(data).then(res => {
            if(res.code === 1){
              this.$message({
                message: '用户添加成功',
                type: 'success'
              });
              this.init()
              this.cancel()
            }
          })
        }
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
    },
    beforeDestroy: function () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    filters: {
      permissions (id , permissList) {
        let str = ''
        permissList.forEach(item => {
          if(id * 1 === item.id){
            str = item.title
          }
        })
        return str
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
    .container {
        position: relative;
        height: calc(100vh - 50px);
        .star-task {
            position: absolute;
            top: 0;
            left: 0;
            width: 300px;
            min-height: calc(100vh - 50px);
            padding: 10px;
            margin-left: 10px;
            h3 {
                text-align: center;
            }
            .itme {
                padding: 10px;
                .progress {
                    animation: myfirst 1s;
                    -o-animation: myfirst 1s; /* Firefox */
                    -webkit-animation: myfirst 1s; /* Safari 和 Chrome */
                    -o-animation: myfirst 1s;
                    animation-iteration-count: infinite;
                    -webkit-animation-iteration-count: infinite;
                    -o-animation-iteration-count: infinite;
                    -o-animation-iteration-count: infinite;
                }
            }
        }
        .task-list {
            padding: 10px;
            margin: 0 10px;
        }
    }

    .task {
        .task-list {
            margin-left: 320px;
        }
    }

    @keyframes myfirst {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @-moz-keyframes myfirst /* Firefox */
    {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @-webkit-keyframes myfirst /* Safari 和 Chrome */
    {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @-o-keyframes myfirst /* Opera */
    {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
</style>
