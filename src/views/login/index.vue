<template>
  <div class="login">
      <!-- 使用Element组件 卡片组件-->
      <el-card class="login-card">
          <!-- 匿名插槽 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单都是由 el-form包裹-->
          <el-form style="margin-top:20px">
              <el-form-item>
                  <!-- 手机号 -->
                  <el-input></el-input>
              </el-form-item>
              <el-form-item>
                  <!-- 验证码 -->
                  <el-input style="width:65%"></el-input>
                  <!-- 发送验证码 -->
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <!-- 同意选项 -->
                  <el-checkbox>我已阅读这些条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <!-- 登录按钮 -->
                  <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
