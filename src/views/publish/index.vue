<template>
  <el-card v-loading="loading">
       <bread-crumb slot='header'>
          <template slot='title'>发布文章</template>
       </bread-crumb>
       <!-- 表单 -->
       <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:100px" label-width="100px">
          <el-form-item prop="title" label="标题">
             <el-input v-model="formData.title" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
             <quill-editor v-model="formData.content" style="height:400px"></quill-editor>
          </el-form-item>
          <el-form-item prop="cover" label="封面" style="margin-top:120px">
             <el-radio-group v-model="formData.cover.type" @change="changeType">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
          </el-form-item>
           <!-- 封面组件 传递父组件的images到子组件 父传子-->
          <cover-image @selectImg="changeImg" :images="formData.cover.images"></cover-image>
          <el-form-item prop="channel_id" label="频道">
             <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="publish(false)">发布文章</el-button>
             <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      loading: false,
      formData: {
        title: '', // 标题
        content: '', // n内容
        channels_id: null, // 频道
        cover: {
          type: 0,
          images: []
        }// 封面 封面类型 -1:自动，0-无图，1-1张，3-3张
        // type == 0 => images => []
        // type==1 =>images=> [一个字符串] =》 字符串是封面的图片地址
        // type==3 => images => [3个字符串] =》 字符串是封面的图片地址
        // type==-1 => images => [可有可无] =》 归为无
      },
      // 发布规则
      publishRules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度在5-30个字符' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 接收子组件传过来得数据 更改images [""] ["","",""] []
    changeImg (url, index) {
      //    this.formData.cover.images[index] = url // 错误
      // Vue 更新原理 this.a = "zhangsan"  this.list[index] =  值 错误的
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到了要修改的值吧
      //     return url
      //   }
      //   return item
      // })
      // this.formData.cover.images.splice(index, 1, url) // 直接替换 只适用于字符串数组的情况
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 封面类型改变事件
    changeType () {
      // 根据type进行images的长度变化
      // 可以获取最新的type
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// images的长度为1
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']// images的长度为3
      } else {
        this.formData.cover.images = []
      }
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频道
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    // 发布文章 validate
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功了 => 回到内容列表
            this.$router.push('/home/articles')
          })
          // 原始代码
          // if (articleId) {
          //   // 修改
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     method: 'put',
          //     data: this.formData
          //   }).then(result => {
          //     // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     data: this.formData
          //   }).then(() => {
          //   // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // 获取id
    let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
    articleId && this.getArticleById(articleId) // 如果articleId存在才执行后界面的逻辑
    // if (articleId) {
    //   this.getArticleById(articleId)
    // }
  }
}
</script>

<style>

</style>
