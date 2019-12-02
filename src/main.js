import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes';

import Amplify, * as AmplifyModuls from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';

import  store  from './vuex/store'

Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModuls);
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && ((!store.state.app_user.authenticated) && (!store.state.web_user.authenticated)) ) {
    next("/authenticate")
  } else {
    next()
  } 

})

window.EventHub = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
