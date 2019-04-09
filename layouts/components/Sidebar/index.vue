<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  data() {
    return {
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    routes() {
      // TODO 现在只支持二级菜单，多级菜单的处理 很多平台都需要改的哦, 或者把下面的方法改成递归就好了
      const menuList = sessionStorage.menuList && JSON.parse(sessionStorage.menuList) || []
      const routes = this.$router.options.routes || []
      console.log(routes)
      const routes22 = JSON.parse(JSON.stringify(this.$router.options.routes)) || []
      const constantRouter = []
      // 删除静态路由
      for (let i = routes22.length - 1; i >= 0; i--) {
        if (routes22[i].hidden) {
          routes22.splice(i, 1)
        }
      }
      // 静态路由
      routes.forEach((v, i) => {
        if (v.hidden) {
          constantRouter.push(v)
        }
      })
      // 动态路由的处理，有权限就把hidden变成false
      routes22.forEach((v, i) => {
        menuList.forEach((vv, ii) => {
          if (vv.url === v.path) {
            v.hidden = false
            v.children.forEach((vvv, iii) => {
              vv.children.forEach((vvvv, iiii) => {
                if (vvvv.url === (v.path + '/' + vvv.path)) {
                  vvv.hidden = false
                }
              })
            })
          }
        })
      })
      // 将没有权限的菜单隐藏
      routes22.forEach((v, i) => {
        if (v.hidden !== false) {
          v.hidden = true
        }
        v.children && v.children.forEach((item, key) => {
          if (item.hidden !== false) {
            item.hidden = true
          }
        })
      })
      // console.log(routes22, 'routes22')
      // console.log(menuList, 'menuList')
      // console.log(constantRouter, 'constantRouter')
      // console.log(constantRouter.concat(routes22), 'constantRouter + routes22')
      // console.log(this.$router.options.routes)
      // console.log(this.$store.getters.menuList)
      return constantRouter.concat(routes22)
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {

  }
}
</script>
