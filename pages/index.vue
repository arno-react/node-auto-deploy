<template>
    <section class="container " :class="{'task': deployList && Object.keys(deployList).length}">
        <div class="star-task" v-show="deployList && Object.keys(deployList).length">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>启动中的任务</span>
                </div>
                <div class="itme" v-for="(item ,key) in deployList" :key="key" @click.stop="see(key)">
                    任务：<span>{{item.title}}</span><span>#{{item.num}}</span>
                    <div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
                         class="el-progress el-progress--line is-exception">
                        <div class="el-progress-bar">
                            <div class="el-progress-bar__outer" style="height: 6px;">
                                <div class="el-progress-bar__inner progress" style="width: 50%;"><!----></div>
                            </div>
                        </div>
                        <div class="el-progress__text" style="font-size: 14.4px;" v-permiss="'/stopTask.json'" @click.stop="stopTask(key)"><i
                                class="el-icon-circle-close"></i></div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="task-list">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>任务列表</span>
                    <el-button style="float: right; padding: 3px 0" type="text" v-permiss="'/addTask.json'" @click.native.prevent="addTask()"> 新增
                    </el-button>
                </div>

                <el-table
                        :data="taskList"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="title"
                            label="标题"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="des"
                            label="描述"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="store_url"
                            label="仓库地址"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="store_type"
                            label="仓库类型"
                            width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.store_type === 0 ? 'git' : 'svn'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="branch"
                            label="仓库分支"
                            width="120">
                        <template slot-scope="scope">
                            <el-tag size="medium">{{ scope.row.branch }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="workspace"
                            label="任务工作目录"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="任务状态"
                            width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.status === 0 ? '没有执行' : '执行中'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button
                                    v-permiss="'/delTask.json'"
                                    @click.native.prevent="delTask(scope.row.id)"
                                    type="text"
                                    size="small">
                                移除
                            </el-button>
                            <el-button
                                    v-permiss="'/taskDetail.json'"
                                    @click.native.prevent="editorTask(scope.row.id)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                            <el-button
                                    v-permiss="'/startTask.json'"
                                    @click.native.prevent="startTask(scope.row.id)"
                                    type="text"
                                    size="small">
                                执行任务
                            </el-button>
                            <el-button
                                    v-permiss="'/performTaskList.json'"
                                    @click.native.prevent="historyTask(scope.row)"
                                    type="text"
                                    size="small">
                                历史任务
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <editor :id="id" :show="editorShow" @cancel="cancel" @update="init"></editor>
        <history :id="id" :show="historyShow" :title="title" @cancel="cancel" @see="see"></history>
        <taskDetail :id="taskId" :show="detailShow" @cancel="cancel"></taskDetail>
    </section>
</template>

<script>
  import * as Task from '../api/task'
  import editor from '@/components/editor'
  import history from '@/components/history'
  import taskDetail from '@/components/taskDetail'

  export default {
    data() {
      return {
        percentage: 0,
        editorShow: false,
        historyShow: false,
        detailShow: false,
        id: '',
        title: '',
        taskId: ''
      }
    },
    components: {
      editor,
      history,
      taskDetail
    },
    mounted() {
      this.init()
    },
    computed: {
      taskList() {
        return this.$store.state.taskList
      },
      deployList() {
        var data = this.$store.state.deployList
        if (!data.length) {
          this.init
        }
        return data
      }
    },
    methods: {
      init() {
        this.$store.dispatch('taskList')
        this.$store.dispatch('permissList')
      },
      delTask(id) {
        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Task.delTask(id).then(data => {
            if (data.code === 1) {
              this.$message({
                message: '任务删除成功',
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
      editorTask(id) {
        this.editorShow = true
        this.id = id
      },
      historyTask(row) {
        this.historyShow = true
        this.id = row.id
        this.title = row.title
      },
      addTask() {
        this.editorShow = true
        this.id = ''
      },
      see(id) {
        this.detailShow = true
        this.taskId = id
      },
      cancel() {
        this.editorShow = false
        this.historyShow = false
        this.detailShow = false
        this.id = ''
        this.taskId = ''
        this.title = ''
      },
      startTask(id) {
        this.$confirm('此操作将启动任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Task.startTask(id).then(data => {
            if (data.code === 1) {
              this.$message({
                message: '任务启动成功',
                type: 'success'
              });
              this.init()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })

      },
      stopTask(id) {
        this.$confirm('此操作将停止任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Task.stopTask(id).then(data => {
            if (data.code === 1) {
              this.$message({
                message: '任务停止成功',
                type: 'success'
              });
              this.init()
            }

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })

      }
    },
    beforeDestroy: function () {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    },
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
