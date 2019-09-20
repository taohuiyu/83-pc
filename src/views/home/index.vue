<template>
<!-- 先定义一个大容器 -->
  <el-container>
      <!-- 放置左侧 -->
      <el-aside style="width:200px">
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部 -->
          <el-header>
            <layout-header></layout-header>
          </el-header>
          <!-- 中间 -->
          <el-main></el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
