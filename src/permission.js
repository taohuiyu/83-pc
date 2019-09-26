// 权限
import router from './router'
// 引入进度条模块
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' // 引入css
router.beforeEach(function (to, from, next) {
  // 开启进度条
  nprogress.start()
  // 判断拦截的范围
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')// 获取token
    // 进入到了拦截范围
    // 判断是否登录，有token就登录，没token 就没登录
    if (token) {
      // 如果有token
      next()
    } else {
      next('/login')// 没有就跳转到登录页
    }
  } else {
    next()// 放行
  }
})
// 全局后置守卫
router.afterEach(function () {
  // 关闭进度条
  nprogress.done()
})
// 先导出
export default router
