import Vue from 'vue';
import store from '../store'
import VueRouter from 'vue-router';
import dashboard from './dashboard';
import authentication from './authentication';
import publicRoutes from './public'

Vue.use(VueRouter)

const routes = [
  ...publicRoutes,
  authentication,
  dashboard
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['Authentication/isAuth'];
  if(to.matched.some(rec => rec.meta.requiresAuthentication)) {
    if(!loggedIn){
      store.dispatch('Authentication/logoutUser');
      next({
        path: '/authentication/login',
        query: {
          redirect : to.fullPath
        }
      });
    }else{
      next();
    }
  }else if (to.matched.some(rec => rec.meta.requiresGuest)) {
    if(loggedIn){
      next({
        path: '/',
        query: {
          redirect : to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
