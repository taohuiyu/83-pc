<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">图文数据</template>
      </bread-crumb>
      <el-row type="flex">
          <div class="echerts" ref="workChart"></div>
          <div class="echerts" ref="liefChart"></div>
      </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      work: [820, 932, 901, 934, 1290, 1330, 1320],
      life: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  // 数据进来一秒跟新一次
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  mounted () {
    // 图表的初始化
    this.workChart = echarts.init(this.$refs.workChart)
    this.setWorkOption()
    // 柱状图
    this.liefChart = echarts.init(this.$refs.liefChart)
    this.setLifeOption()
  },
  methods: {
    // 图表时时更新
    updateData () {
      this.work = this.work.map(item => {
        return item * (Math.random() + 0.7)
      })
      this.life = this.life.map(item => {
        return item * (Math.random() + 0.55)
      })
    },
    // 工作的图表显示
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.work,
          type: 'line'
        }]
      })
    },
    // 柱状图
    setLifeOption () {
      this.liefChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.life
          }
        ]
      })
    }
  },
  watch: {
    work (newValue) {
      // 重新的setoption
      this.setWorkOption()
    },
    life (newValue) {
      // 重新的setoption
      this.setLifeOption()
    }
  }
}
</script>

<style>
.echerts{
    width: 600px;
    height: 400px;
}
</style>
