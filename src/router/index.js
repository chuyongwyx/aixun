import Vue from 'vue';
import Router from 'vue-router';
import routers from './router';
import Cookies from 'js-cookie';
Vue.use(Router)

const router = new Router({
  routes: routers
})
router.beforeEach((to,from,next)=>{
    if(to.meta.Auth){
      if(Cookies.get('token')){
        next();
      }else{
        next("/login");
      }
    }else{
      next();
    }
  })

export default router