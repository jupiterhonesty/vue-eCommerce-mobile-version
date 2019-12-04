<template>

  <div id="mySidenav" class="sidenav" :class="{ openSide:leftSidebarVal }">
    <a class="sidebar-overlay" @click="closeLeftBar(leftSidebarVal)"></a>
    <nav>
      <a @click="closeLeftBar(leftSidebarVal)">
        <div class="sidebar-back text-left">
          <i class="fa fa-angle-left pr-2" aria-hidden="true"></i> Back
        </div>
      </a>
      <!-- Sample menu definition -->
       <ul id="sub-menu-auth" class="sidebar-menu">
         <li>
            <router-link :to="{ path: '/home' }">Home</router-link>           
           </li>
           <li>
            <router-link :to="{ path: '/collection/shop' }">Shop</router-link>           
           </li>
           <li>
            <router-link :to="{ path: '/' }">Products</router-link>           
           </li>
          <li>
           <router-link v-if="!signedIn" :to="{ path: '/page/account/login' }">Login/Signup</router-link>
            <a v-if="signedIn" @click="signOut" href="#">Logout</a>     
           </li>
           
       </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {signOut} from '@/utils/auth'
export default {
  props: ['leftSidebarVal'],
  data() {
    return {
      activeItem: 'clothing',
    }
  },
  computed:{
    ...mapGetters({
      signedIn:'auth/signedIn'
    })
  },
  methods: {
    signOut() {
      signOut()
    },  
    closeLeftBar(val) {
      val = false
      this.$emit('closeVal', val)
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      if (this.activeItem === menuItem) {
        this.activeItem = ''
      } else {
        this.activeItem = menuItem
      }
    }
  }
}
</script>
