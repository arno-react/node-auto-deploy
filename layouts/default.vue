<template>
  <div :class="classObj" class="app-wrapper">
    <head-nav />
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain, Sidebar, headNav } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    headNav
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      console.log(this.$store.state)
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  top: 60px;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
#app {
  .sidebar-container {
    top: 60px;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
