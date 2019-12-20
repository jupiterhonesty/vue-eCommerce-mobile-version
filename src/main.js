import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes';
import Amplify, * as AmplifyModuls from 'aws-amplify';
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue';
import aws_exports from './aws-exports';
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import Vue2Filters from 'vue2-filters'
import { VueMasonryPlugin } from 'vue-masonry'
import InfiniteLoading from 'vue-infinite-loading'
import VueLazyLoad from 'vue-lazyload'
import BootStrapVue from 'bootstrap-vue'
import store from './vuex/store'
import * as VueGoogleMaps from "vue2-google-maps";

/**** CSS Import ****/
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/dist/css/swiper.css'
import './assets/scss/app.scss'


Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModuls);
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
Vue.use(Vue2Filters)
Vue.use(VueMasonryPlugin)
Vue.use(InfiniteLoading)
Vue.use(VueLazyLoad)
Vue.use(BootStrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDN8W7bJMK4jqFzWFBeeBFwnrm8uTkrm7k",
    libraries: "places"
  }
});

const { dispatch, getters } = store  

dispatch('auth/findUser');

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  
  var app_user_authenticated = getters['auth/appUserAuthed']
  var web_user_authenticated = getters['auth/webUserAuthed']

  if (to.matched.some(record => record.meta.requiresLogin) && ((!app_user_authenticated) && (!web_user_authenticated))) {
    next("/page/appstore")
  } else {
    next()
  }

})


AmplifyEventBus.$on('authState', async (state) => {
  
  const pushPathes = {
    signedOut: () => {
      dispatch('logout')
      router.push({ path: '/page/account/login' })
    },
    signUp: () => {
      router.push({ path: '/page/account/register' })
    },
    confirmSignUp: () => {
      router.push({ path: '/page/account/register_confirm' })
    },
    signIn: () => {
      router.push({ path: '/page/account/login' })
    },
    signedIn: () => {
      dispatch('auth/findUser');
      router.push({ path: '/home' })
    }
  }
  if (typeof pushPathes[state] === 'function') {
    pushPathes[state]()
  }
})


window.EventHub = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
