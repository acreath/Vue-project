import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

import './assets/css/global.css'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 配置请求拦截器，给需要权限的请求在请求头的headers中配置token
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config

})

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
