import Home from './views/home'
import Login from './views/page/account/login'
import Register from './views/page/account/register'
import RegisterConfirm from './views/page/account/registerConfirm'
import Shop from './views/collection/shop'
let routes = [

  {
    path: '/',
    name: 'appstart',
    redirect: { path: '/home' }
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
  }
];

export default routes;