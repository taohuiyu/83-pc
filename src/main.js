import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
// import axios from 'axios'
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// Vue.proyotype.$http = axios
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
