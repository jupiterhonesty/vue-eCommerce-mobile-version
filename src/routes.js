import Home from './views/home'
import Login from './views/page/account/login'
import Register from './views/page/account/register'
import RegisterConfirm from './views/page/account/registerConfirm'
import AsyncAppStart from './views/page/app-account/asyncAppStart'
import Shop from './views/collection/shop'
import Product from './views/product'
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
    meta: { requiresLogin: false },
  },
  {
    path: '/page/account/login',
    name: 'login',
    component: Login
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
    component: Shop
  },
  {
    path:'/product/sidebar/:id',
    name: 'product',
    component: Product
  }

 
];

export default routes;