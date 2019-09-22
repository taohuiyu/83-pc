<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <!-- slot="header"是给el-card的插槽 -->
    <bread-crumb slot="header">
      <!-- slot是给面包屑的插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- el-table 表格 -->
    <el-table :data="list">
      <!-- el-table-column 属性prop=>字段名 label=>表头-->
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        align="center"
        label="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj">
          <!-- 自定义内容，获取其他列的数据 -->
          <el-button size="small" type="text">修改</el-button>
          <el-button
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
            @click="closeOrOpen(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 需要知道分多少页，当前是第几页，总共有多少页-->
    <el-row type="flex" justify="center" style="margin:20px 0">
       <el-pagination @current-change="changePage" :page-size="page.pageSize" :current-page="page.currentPage" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 分页信息
      page: {
        total: 0,
        currentPage: 1, // 默认第一页
        pageSize: 10// 每页有多少条数据
      },
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论列表
    getComment () {
      this.loading = true// 显示遮罩
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize } // params是路径参数，也就是query
      }).then(result => {
        this.list = result.data.results // 把返回的数据给list
        this.page.total = result.data.total_count// 把总条数给分页总条数
        this.loading = false// 关闭遮罩
      })
    },
    // filter   return
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论 row表示当前行数据
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开' // 得到打开或者关闭
      this.$confirm(`您确定要${mess}评论吗？`).then(() => {
        // 确定就要掉接口
        this.$axios({
          url: 'comments/status',
          params: { article_id: row.id.toString() }, // 路径参数
          data: { allow_comment: !row.comment_status },
          method: 'put'
        }).then(() => {
          // 成功一定会进then
          this.getComment() // 重新拉取数据
        })
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
