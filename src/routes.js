import Home from './views/Home.vue'
import About from './views/About.vue'
import Account from './views/Account.vue'
import Authenticate from './views/Authenticate.vue'
import Checkout from './views/Checkout.vue'
import Shop from './views/Shop.vue'
import Order from './views/Order.vue'

const AsyncAppstart = () => import(`./views/Appstart.vue`);
let routes = [
  
          
        {
            path: '/',
            name: 'appstart',
            component: AsyncAppstart
          },
          {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {requiresLogin: false},
          },
          {
            path: '/about',
            name: 'about',
            component: About,
            meta: {requiresLogin: true},
          },
          {
            path: '/authenticate',
            name: 'authenticate',
            component: Authenticate
          },
          {
            path: '/account',
            name: 'account',
            component: Account,
            // disable for non signin mode
            meta: {requiresLogin: true},
          },
          {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            // disable for non signin mode
            meta: {requiresLogin: true},
          },
          {
            path: '/shop',
            name: 'shop',
            component: Shop,
            meta: {requiresLogin: true},
          },
          {
            path: '/order',
            name: 'order',
            component: Order,
            // disable for non signin mode
            meta: {requiresLogin: true},
          }  
];

export default routes;