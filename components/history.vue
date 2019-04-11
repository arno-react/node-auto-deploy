<template>
    <el-dialog :title="title" :visible.sync ="visible" width="70%" @close="cancel">
            <el-table
                    :data="data"
                    style="width: 100%" max-height="500">
                <el-table-column
                        fixed
                        prop="num"
                        label="#"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="start_uid"
                        label="执行任务用户"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="store_url"
                        label="仓库地址"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="任务状态"
                        width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.status === 0 ? '执行中' : '执行完成'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">

                        <el-button
                                @click.native.prevent="seeTask(scope.row.id)"
                                type="text"
                                size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
    </el-dialog>
</template>

<script>
  import * as Task from '../api/task'
  export default {
    name: 'history',
    data: function () {
      return {
        data:[],
        visible: false
      }
    },
    props: {
      id: {
        type: [String, Number]
      },
      show: false,
      title: [String, Number]
    },
    watch: {
      show(newD, oldD){
        this.visible = newD
      },
      id(newD, oldD) {
        if (newD) {
          this.getInitData(newD)
        } else {
          this.data = []
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      cancel() {
        this.$emit('cancel')
      },
      seeTask (id) {
        this.$emit('see', id)
      },
      getInitData(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Task.performTaskList(id).then(res => {
          if (res.code === 1) {
            this.data = res.data
          }
          loading.close();
        }).catch(() => {
          loading.close();
        })
      },
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
