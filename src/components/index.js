// 实现整体组件的统一传入
import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
import breadCrumb from './common/bread-crumb'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import coverImg from './publish/cover-image'
import selectImg from './publish/select-image.vue'
export default {
  install: function (Vue) {
    // 调用install方法，传入Vue对象
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)// 注册面包屑组件
    Vue.component('quill-editor', quillEditor)// 全局注册富文本编辑器
    Vue.component('cover-image', coverImg)
    Vue.component('select-image', selectImg)
  }
}
