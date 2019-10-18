import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from '@/vuex/index.js' //vuex
import Vant from 'vant';
import 'vant/lib/index.css';
import ViewUI from 'view-design';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'view-design/dist/styles/iview.css';
Vue.use(Vant);
//按需引入
// import './vant/vant-component'
Vue.prototype.$axios = axios;
Vue.use(ViewUI);
Vue.use(ElementUI, { size: 'small' });
import { Dialog } from 'vant';
//使用钩子函数对路由进行权限跳转
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.userInfo ? true : false
        // const isLogin = true
    if (to.path == "/login") {
        next();
    } else {
        if (isLogin) {
            store.commit('SET_USERINFO', userInfo)
            next()
        } else {
            next('/login')
        }

    }

    ////**************************************** * 无用信息/
    // if (userInfo == null) {
    //     Dialog.alert({
    //         title: '请登录',
    //         message: '没有用户信息请登录'
    //     }).then(() => {
    //         Dialog.close
    //     });
    //     next('/login')

    // } else {
    //     let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     // console.log(userInfo)
    //     store.commit('SET_USERINFO', userInfo)
    //     next()
    // }
    // if (!role && to.path !== '/login' && to.path !== '/vedio') {
    //     next('/login');
    // } else
    //     console.log(to.meta)
    // if (to.meta.permission) {
    //     // 鉴权
    //     let menuItems = localStorage.getItem('menuItems');
    //     console.log(menuItems);
    //     userInfo === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');