// 实现整体组件的统一传入
import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
export default {
  install: function (Vue) {
    // 调用install方法，传入Vue对象
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
  }
}
