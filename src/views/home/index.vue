<template>
<!-- 先定义一个大容器 -->
  <el-container>
      <!-- 放置左侧 -->
      <el-aside>
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部 -->
          <el-header></el-header>
          <!-- 中间 -->
          <el-main></el-main>
      </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
