<template>
  <el-card style="visibilty: visible">
     <!-- 面包屑组件 -->
     <!-- slot="header"是给el-card的插槽 -->
     <bread-crumb slot="header">
     <!-- slot是给面包屑的插槽 -->
         <template slot="title">评论列表</template>
     </bread-crumb>
     <!-- el-table 表格 -->
     <el-table :data="list" >
        <!-- el-table-column 属性prop=>字段名 label=>表头-->
        <el-table-column width="600px" label="标题" prop="title" ></el-table-column>
        <el-table-column align="center" label="评论状态" prop="comment_status" ></el-table-column>
        <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
     </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' } // params是路径参数，也就是query
      }).then(result => {
        this.list = result.data.results// 把返回的数据给list
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
