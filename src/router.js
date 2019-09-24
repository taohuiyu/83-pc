import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue' // 完整写法
import Home from './views/home/'
import Login from './views/login' // 简写
import Main from './views/home/main'
Vue.use(Router)
export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 什么都不写 就默认是二级路由组件的
          component: Main // 默认二级路由
        },
        {
          // path:'/home/comment', // 完整写法
          path: 'comment', // 评论列表路径
          // 按需加载
          component: () => import('./views/comment')
        }, {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'articles',
          component: () => import('./views/articles')
        }, {
          // 修改文章
          path: 'publish/:articleId',
          component: () => import('./views/publish')
        }, {
          // 新建组件
          path: 'publish',
          component: () => import('./views/publish')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
