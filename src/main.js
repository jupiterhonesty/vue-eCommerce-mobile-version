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
import PayPal from 'vue-paypal-checkout'
import VueLazyLoad from 'vue-lazyload'
import BootStrapVue from 'bootstrap-vue'
import store from './vuex/store'

/**** CSS Import ****/
import './assets/scss/app.scss'
import 'swiper/dist/css/swiper.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModuls);
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
Vue.use(Vue2Filters)
Vue.use(VueMasonryPlugin)
Vue.use(InfiniteLoading)
Vue.component('paypal-checkout', PayPal)
Vue.use(VueLazyLoad)
Vue.use(BootStrapVue)



Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  var { dispatch, getters } = store  
  dispatch('auth/findUser');
  var app_user_authenticated = getters['auth/appUserAuthed']
  var web_user_authenticated = getters['auth/webUserAuthed']
  if (to.matched.some(record => record.meta.requiresLogin) && ((!app_user_authenticated) && (!web_user_authenticated))) {
    next("/page/account/login")
  } else {
    next()
  }

})


AmplifyEventBus.$on('authState', async (state) => {
  const pushPathes = {
    signedOut: () => {
      router.push({ path: '/page/account/login' })
    },
    signUp: () => {
      router.push({ path: '/page/account/register' })
    },
    confirmSignUp: () => {
      router.push({ path: '/signUpConfirm' })
    },
    signIn: () => {
      router.push({ path: '/page/account/login' })
    },
    signedIn: () => {
      store.dispatch('auth/findUser');
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
