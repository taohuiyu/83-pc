import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components' // 引入插件对象
// import axios from 'axios'

import axios from './utils/axios.config'

import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将地址的常态值设置给baseUrl

Vue.prototype.$axios = axios // 第一种方法 将axios共享给所有Vue或者组件实例使用
// Vue.use(axios)//第二种方法
Vue.config.productionTip = false
Vue.use(ElementUI) // 相当于全局注册elementUI  Vue.use => 干了什么?
Vue.use(Component) // 注册插件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
