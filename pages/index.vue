<template>
    <section class="container " :class="{'task': deployList && Object.keys(deployList).length}">
        <div class="star-task" v-show="deployList && Object.keys(deployList).length">
            <h3>启动中的任务</h3>
            <div class="itme" v-for="(item ,key) in deployList" :key="key">
                任务：<span>{{item.title}}</span><span>#{{item.num}}</span>
                <div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
                     class="el-progress el-progress--line is-exception">
                    <div class="el-progress-bar">
                        <div class="el-progress-bar__outer" style="height: 6px;">
                            <div class="el-progress-bar__inner progress" style="width: 50%;"><!----></div>
                        </div>
                    </div>
                    <div class="el-progress__text" style="font-size: 14.4px;" @click="stopTask(key)"><i class="el-icon-circle-close"></i></div>
                </div>
            </div>
        </div>
        <div class="task-list">
            <el-table
                    :data="taskList"
                    style="width: 100%"
                    max-height="250">
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
                                @click.native.prevent="delTask(scope.row.id)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                        <el-button
                                @click.native.prevent="editorTask(scope.row.id)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="startTask(scope.row.id)"
                                type="text"
                                size="small">
                            执行任务
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
  import * as Task from '../api/task'

  export default {
    data() {
      return {
        percentage: 0
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      taskList() {
        return this.$store.state.taskList
      },
      deployList() {
        return this.$store.state.deployList
      }
    },
    methods: {
      init() {
        this.$store.dispatch('taskList')
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
      editorTask() {
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
            border: 1px solid #eee;
            border-radius: 20px;
            margin-left: 10px;
            h3 {
                text-align: center;
            }
            .itme {
                padding: 10px;
                .progress{
                    animation: myfirst 1s;
                    -o-animation: myfirst 1s;	/* Firefox */
                    -webkit-animation: myfirst 1s;	/* Safari 和 Chrome */
                    -o-animation: myfirst 1s;
                    animation-iteration-count:infinite;
                    -webkit-animation-iteration-count:infinite;
                    -o-animation-iteration-count:infinite;
                    -o-animation-iteration-count:infinite;
                }
            }
        }
        .task-list {
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 20px;
            margin: 0 10px;
        }
    }

    .task {
        .task-list {
            margin-left: 320px;
        }
    }

    @keyframes myfirst
    {
        from {width: 0;}
        to {width: 100%;}
    }

    @-moz-keyframes myfirst /* Firefox */
    {
        from {width: 0;}
        to {width: 100%;}
    }

    @-webkit-keyframes myfirst /* Safari 和 Chrome */
    {
        from {width: 0;}
        to {width: 100%;}
    }

    @-o-keyframes myfirst /* Opera */
    {
        from {width: 0;}
        to {width: 100%;}
    }
</style>
