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
      let constantRouter = [
        {
          title: '首页',
          path: '/',
          icon: '',
          id: 0
        },
        {
          title: '用户管理',
          path: '/user',
          icon: '',
          id: 0
        }
      ]
      return menuList
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {

  }
}
</script>
