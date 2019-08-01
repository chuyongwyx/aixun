// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import "./common/css/reset.css";
import 'iview/dist/styles/iview.css';
import "./common/font/iconfont.css";
import "./common/css/animate.min.css";
import store from "./store"
import iview from 'iview';
//mock摸拟数据打包时替换
// import './mock/buildBand/buildBand.js';
// import './mock/traningOrg/traningOrg.js';
// import './mock/userAdmin/userAdmin.js';
import './utils/refreshToken';
Vue.config.productionTip = false
Vue.use(iview);

/* eslint-disable no-new */
 const vm =new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
})

export default{
     vm
}
