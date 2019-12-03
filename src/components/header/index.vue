<template>
  <div>
    <header>
      <div class="mobile-fix-option"></div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="main-menu">
              <div class="menu-left">
                <div class="navbar">
                  <a @click="left_sidebar">
                    <div class="bar-style">
                      <i class="fa fa-bars sidebar-bar" aria-hidden="true"></i>
                    </div>
                  </a>
                  <LeftSidebar :leftSidebarVal="leftSidebarVal" @closeVal="closeBarValFromChild" />
                </div>
                <div class="brand-logo">
                  <router-link :to="{ path: '/home'}">
                    <img :src='"@/assets/images/icon/logo.png"' class="img-fluid" alt />
                  </router-link>
                </div>
              </div>
              <div class="menu-right pull-right">                
                  <HeaderWidgets/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import LeftSidebar from '../widgets/left-sidebar'
import HeaderWidgets from '../widgets/header-widgets'
export default {
  data() {
    return {
      leftSidebarVal: false
    }
  },
  components: {
    LeftSidebar,
    HeaderWidgets
  },
  methods: {
    left_sidebar() {
      this.leftSidebarVal = true
    },
    closeBarValFromChild(val) {
      this.leftSidebarVal = val
    }
  }
}
</script>
