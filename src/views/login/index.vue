<template>
  <div class="login">
      <!-- 使用Element组件 卡片组件-->
      <el-card class="login-card">
          <!-- 匿名插槽 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单都是由 el-form包裹-->
          <el-form :model="loginFrom" :rules="loginRules"     style="margin-top:20px" ref="myForm">
              <el-form-item prop="mobile">
                  <!-- 手机号 -绑定v-model- > -->
                  <el-input v-model="loginFrom.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 验证码 -->
                  <el-input v-model="loginFrom.code" style="width:65%" placeholder="请输入验证码"></el-input>
                  <!-- 发送验证码 -->
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <!-- 同意选项 -->
                  <el-checkbox v-model="loginFrom.agree">我已阅读这些条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <!-- 登录按钮 -->
                  <el-button @click="login" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    let validator = function (rule, value, callBack) {
    //   if (value) {
    //     // 正确 勾选协议
    //     callBack()// 一切ok请执行
    //   } else {
    //     // 不正确 没有勾选协议
    //     callBack(new Error('您必须无条件被我们蒙骗'))
    //   }
      value ? callBack() : callBack(new Error('您必须无条件被我们蒙骗'))
    }
    return {
      // 表单数据
      loginFrom: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意
      },
      loginRules: {// 登录规则集合
        // 决定着校验规则 key(字段名):value（对象数组）
        mobile: [
          // 如果require为true，表示该字段必填,如果不填，就会提示信息
          { required: true,
            message: '请输入您的手机号'
          },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        // 验证码校验
        code: [
          { required: true,
            message: '请输入您的验证码'
          },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        agree: [{ validator }]
      }
    // 自定义校验函数
    }
  },
  methods: {
    login () {
      // validate是一个方法，传入的是一个回调函数
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
//如果加了scoped属性，那么该style只对当前组件有效
//如果要在style样式中写less就要给一个属性lang="less"
.login{
    background-image: url("../../assets/img/login_bg.jpg");
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        height: 340px;
        width: 440px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
