import Home from './views/home'
import Login from './views/page/account/login'
import Register from './views/page/account/register'
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
  }
];

export default routes;