import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/css/iconfont.css'

Vue.use(VueAxios, axios)

import {
  Tabbar,
  TabbarItem,
  Search,
  Toast,
  NoticeBar,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Slider,
  Popup,
  Form,
  Field,
  Button,
} from 'vant';

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Toast)
  .use(NoticeBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(Slider)
  .use(Popup)
  .use(Form)
  .use(Field)
  .use(Button)


Vue.config.productionTip = false

axios.defaults.baseURL = 'https://apis.netstart.cn/music';
// axios.defaults.baseURL = 'https://localhost:3000';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  Toast.clear();
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Toast.clear();
  return Promise.reject(error);
});

// 定义全局过滤器：用于处理时间 ==> 格式：分钟:秒钟 01:20
// Vue.filter('formatSeconds', value => {
//   console.log('value ==> ', value);
//   return '00:00';
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
