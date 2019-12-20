import Home from './views/home'
import Login from './views/page/account/login'
import Register from './views/page/account/register'
import RegisterConfirm from './views/page/account/registerConfirm'
import AsyncAppStart from './views/page/app-account/asyncAppStart'
import Shop from './views/collection/shop'
import Product from './views/product'
import Cart from './views/page/account/cart'
import Checkout from './views/page/account/checkout'
import Ordersuccess from './views/page/order-success'
import Orderhistory from './views/page/order-history'
import Appstore from './views/page/appstore'
let routes = [

  {
    path: '/',//app version
    name: 'appstart',
    redirect: { path: '/page/app-account/asyncappstart' }
  },
  {
    path: '/page/app-account/asyncappstart',
    name:'asyncappstart',
    component: AsyncAppStart
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresLogin: true },
  },
  {
    path: '/page/account/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/page/account/register',
    name: 'register',
    component: Register
  },
  {
    path: '/page/account/register_confirm',
    name: 'registerconfirm',
    component: RegisterConfirm
  },
  {
    path: '/collection/shop',
    name: 'shop',
    component: Shop,
    meta: { requiresLogin: true },
  },
  {
    path:'/product/sidebar/:id',
    name: 'product',
    component: Product,
    meta: { requiresLogin: true },
  },
  {
    path:'/page/account/cart',
    name: 'cart',
    component: Cart,
    meta: { requiresLogin: true },
  },
  {
    path:'/page/account/checkout',
    name: 'checkout',
    component: Checkout,
    meta: { requiresLogin: true },
  },
  {
    path:'/page/order-success',
    name: 'ordersuccess',
    component: Ordersuccess,
    meta: { requiresLogin: true },
  },
  {
    path:'/page/order-history',
    name: 'orderhistory',
    component: Orderhistory,
    meta: { requiresLogin: true },
  },
  {
    path:'/page/appstore',
    name: 'appstore',
    component: Appstore
  }

 
];

export default routes;