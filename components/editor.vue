<template>
    <el-dialog :title="title" :visible="visible" width="70%" @close="cancel">
        <el-form :model="form" label-width="100px">
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="任务标题">
                            <el-input v-model="form.title" placeholder="请输入任务标题"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="任务描述">
                            <el-input v-model="form.des" placeholder="请输入任务描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <el-form-item label="仓库地址">
                    <el-input :disabled="disabled" v-model="form.store_url" placeholder="请输入仓库地址"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="仓库用户名">
                            <el-input :disabled="disabled" v-model="form.store_user" placeholder="请输入仓库用户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="仓库密码">
                            <el-input :disabled="disabled" type="password" v-model="form.store_password" placeholder="请输入仓库密码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="仓库类型">
                            <el-select :disabled="disabled" v-model="form.store_type" placeholder="请选择仓库类型">
                                <el-option label="GIT" :value="0"></el-option>
                                <el-option label="SVN" disabled="" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary" size="medium" @click="getBranch">拉取仓库分支</el-button>
                    </el-col>
                </el-row>
                <el-form-item label="分支" v-show="branchList.length">
                    <el-radio-group v-model="form.branch">
                        <el-radio :label="d" v-for="d in branchList" :key="d"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-card>
            <template v-for="(item, index) in form.cmd">
                <el-card class="box-card" v-if="item.type === 0">
                    <div slot="header" class="clearfix">
                        <span>本地命令</span>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" @click.native.prevent="delTask(index)">删除
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" v-show="index!==0" type="text" @click.native.prevent="upTask(index)">
                            <i class="el-icon-upload2"></i>
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" v-show="index!== (form.cmd.length-1)"   @click.native.prevent="dowTask(index)">
                            <i class="el-icon-download"></i>
                        </el-button>
                    </div>
                    <el-form-item label="本地命令">
                        <el-input v-model="item.cmd"></el-input>
                    </el-form-item>
                    <el-form-item label="命令工作路径">
                        <el-input v-model="item.workspace"></el-input>
                        <div class="tip">命令工作路径如不填，为项目工作目录</div>
                    </el-form-item>
                </el-card>
                <el-card class="box-card" v-if="item.type === 1">
                    <div slot="header" class="clearfix">
                        <span>本地文件复制到远程</span>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" @click.native.prevent="delTask(index)">删除
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" v-show="index!==0" type="text" @click.native.prevent="upTask(index)">
                            <i class="el-icon-upload2"></i>
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" v-show="index!== (form.cmd.length-1)"   @click.native.prevent="dowTask(index)">
                            <i class="el-icon-download"></i>
                        </el-button>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="远程地址">
                                <el-input v-model="item.remote"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码">
                                <el-input v-model="item.remote_password" type="password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="本地路径">
                                <el-input v-model="item.src"></el-input>
                                <div class="tip">本地路径如为相对路径，则相对项目工作目录，如本地路径后有 / 表示上传路径下所以文件</div>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="远程路径">
                                <el-input v-model="item.dest"></el-input>
                                <div class="tip">只能为绝对路径</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="box-card" v-if="item.type === 2">
                    <div slot="header" class="clearfix">
                        <span>远程命令</span>

                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;"  type="text" @click.native.prevent="delTask(index)">删除
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;"  v-show="index!==0" type="text" @click.native.prevent="upTask(index)">
                            <i class="el-icon-upload2"></i>
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" v-show="index!== (form.cmd.length-1)"   @click.native.prevent="dowTask(index)">
                            <i class="el-icon-download"></i>
                        </el-button>
                    </div>
                    <el-form-item label="远程命令">
                        <el-input v-model="item.cmd"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="远程地址">
                                <el-input v-model="form.remote"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码">
                                <el-input v-model="form.remote_password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="命令工作目录">
                        <el-input v-model="form.workspace"></el-input>
                        <div class="tip">只能为绝对路径，可不填为用户目录</div>
                    </el-form-item>
                </el-card>
                <el-card class="box-card" v-if="item.type === 3">
                    <div slot="header" class="clearfix">
                        <span>远程文件复制到本地</span>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" @click.native.prevent="delTask(index)">删除
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" v-show="index!==0" type="text" @click.native.prevent="upTask(index)">
                            <i class="el-icon-upload2"></i>
                        </el-button>
                        <el-button style="float: right; padding: 3px 0;margin-right: 10px;" type="text" v-show="index!== (form.cmd.length-1)"   @click.native.prevent="dowTask(index)">
                            <i class="el-icon-download"></i>
                        </el-button>
                    </div>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="远程地址">
                                <el-input v-model="item.remote"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码">
                                <el-input v-model="item.remote_password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="本地目录">
                                <el-input v-model="item.src"></el-input>
                                <div class="tip">本地路径如为相对路径，则相对项目工作目录</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="远程目录">
                                <el-input v-model="item.dest"></el-input>
                                <div class="tip">只能为绝对路径,如路径后有 / 表示下载路径下所以文件</div>
                            </el-form-item>

                        </el-col>
                    </el-row>
                </el-card>
            </template>
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="19">
                        <el-form-item label="任务类型">
                            <el-radio-group v-model="taskType">
                                <el-radio :label="0">本地命令</el-radio>
                                <el-radio :label="1">本地文件复制到远程</el-radio>
                                <el-radio :label="2">远程命令</el-radio>
                                <el-radio :label="3">远程文件复制到本地</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">
                        <el-button type="primary" @click="addTask"><i class="el-icon-plus"></i>新增命令任务</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="ok" v-permiss="'/addTask.json'">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import * as Task from '../api/task'

  export default {
    name: 'editor',
    data: function () {
      return {
        title: '添加任务',
        visible: false,
        form: {
          title: '',
          des: '',
          store_url: '',
          store_type: 0,
          store_user: '',
          store_password: '',
          branch: '',
          cmd: []
        },
        formLabelWidth: 100,
        taskType: 0,
        branchList: [],
        disabled: false,
        tip: {
          branch: '请选择仓库分支，请选拉',
          store_password: '请输入仓库密码',
          store_user: '请输入仓库用户名',
          store_type: '请选择仓库类型',
          store_url: '请输入仓库地址',
          des: '请输入任务描述',
          title: '请输入任务标题'
        }
      }
    },
    props: {
      id: {
        type: [String, Number]
      },
      show: false
    },
    watch: {
      show(newD, oldD){
        this.visible = newD
      },
      id(newD, oldD) {
        if (newD !== oldD) {
          if (newD) {
            this.title = '编辑任务'
            this.disabled = true
            this.getInitData(newD)
          } else {
            this.title = '添加任务'
            this.disabled = false
            this.form = {
              title: '',
              des: '',
              store_url: '',
              store_type: 0,
              store_user: '',
              store_password: '',
              branch: '',
              cmd: []
            }
            this.branchList = []
          }
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      checkData(data) {
        var status = true
        Object.keys(this.tip).forEach(key => {
          if (!data[key] && data[key]!== 0 ) {
            this.$message({
              type: 'error',
              message: this.tip[key]
            })
           return status = false
          }
        })
        if(!status){
          return false
        }
        if (!data.cmd.length) {
          this.$message({
            type: 'error',
            message: '请添加命令任务'
          })
          return status = false
        }
        data.cmd.forEach(item => {
          if(item.type === 0){
            if(!item.cmd){
              this.$message({
                type: 'error',
                message: '请输入本地命令'
              })
              return status = false
            }
          }else if(item.type === 1 || item.type === 3){
            if(!item.remote){
              this.$message({
                type: 'error',
                message: '请输入远程地址'
              })
              return status = false
            }
            if(!item.remote_password){
              this.$message({
                type: 'error',
                message: '请输入远程密码'
              })
              return status = false
            }
            if(!item.dest){
              this.$message({
                type: 'error',
                message: '请输入远程路径'
              })
              return status = false
            }
            if(!item.src){
              this.$message({
                type: 'error',
                message: '请输入本地路径'
              })
              return status = false
            }

          } else if(item.type === 2){
            if(!item.cmd){
              this.$message({
                type: 'error',
                message: '请输入远程命令'
              })
              return status = false
            }
            if(!item.remote){
              this.$message({
                type: 'error',
                message: '请输入远程地址'
              })
              return status = false
            }
            if(!item.remote_password){
              this.$message({
                type: 'error',
                message: '请输入远程密码'
              })
              return status = false
            }
          }
        })
        return status
      },
      cancel() {
        this.$emit('cancel')
      },
      delTask (index) {
        this.form.cmd.splice(index,1)
      },
      upTask (index){
        if (index === 0) {
          return
        }
        let arr =   this.form.cmd
        arr.splice(index-1, 1, ...arr.splice(index, 1, arr[index - 1]))
      },
      dowTask(index){
        if (index === this.form.cmd.length) {
          return
        }
        let arr =   this.form.cmd
        arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]))
      },
      ok() {
        let data = JSON.parse(JSON.stringify(this.form))
        if (!this.checkData(data)) {
          return
        }
        if (this.id) {
          data.id = this.id
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Task.addTask(data).then(res => {
          if (res.code === 1) {
            this.$emit('update')
            this.$emit('cancel')
          }
          loading.close();
        }).catch(() => {
          loading.close();
        })
      },
      getInitData(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Task.taskDetail(id).then(res => {
          if (res.code === 1) {
            var data = res.data
            var content = data.content
            this.branchList = [content.branch]
            this.form = {
              title: data.title,
              des: data.des,
              store_url: content.store_url,
              store_type: content.store_type,
              store_user: content.store_user,
              store_password: content.store_password,
              branch: content.branch,
              cmd: content.cmd,
            }
          }
          loading.close();
        }).catch(() => {
          loading.close();
        })
      },
      getBranch() {
        console.log(this.form)
        if (!this.form.store_url || !this.form.store_user || !this.form.store_password) {
          this.$message({
            type: 'error',
            message: '仓库信息填写完整'
          })
          return
        }
        var data = {
          store_url: this.form.store_url,
          store_type: this.form.store_type,
          store_user: this.form.store_user,
          store_password: this.form.store_password,
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Task.checkGitInfo(data).then(res => {
          if (res.code === 1) {
            this.form.branch = res.data[0]
            this.branchList = res.data
          }
          loading.close();
        }).catch(() => {
          loading.close();
        })
      },
      addTask() {
        this.form.cmd.push(this.getTaskTypeObj(this.taskType))
        // this.form = JSON.parse(JSON.stringify(this.form))
      },
      getTaskTypeObj(type) {
        var obj = {}
        switch (type) {
          case 0 :
            obj = {
              type: 0,//本地
              cmd: '',
              workspace: ''
            }
            break;
          case 1 :
            obj = {
              type: 1,//scp 本地 -远程
              src: '',
              dest: '',
              remote: '',
              remote_password: ''
            }
            break;
          case 2 :
            obj = {
              type: 2,//远程
              cmd: '',
              workspace: '',
              remote: '',
              remote_password: ''
            }
            break;
          case 3 :
            obj = {
              type: 3,//scp 远程 - 本地
              src: '',
              dest: '',
              remote: '',
              remote_password: ''
            }
            break;
        }
        return obj
      }
    },
    component: {},
    created: function () {
      // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，
      // 属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始， 属性目前不可见。
    },
    mounted: function () {
      // el 被新创建的 vm. 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm. 也在文档内。
    },
    beforeDestroy: function () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
    destroyed: function () {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    },
    filters: {}
  }
</script>

<style lang="scss">
    /*lang="scss"*/
    .box-card {
        margin-top: 10px;
        .el-card__body {
            padding-bottom: 0;
        }
    }

    .tip {
        color: red;
        line-height: 1.3;
        margin-top: 5px;
    }
</style>
