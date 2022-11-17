<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'BarChart',
    mounted() {
      // 初始化 echarts
      let barCharts = echarts.init(this.$refs.charts);
      // 配置数据
      barCharts.setOption({
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: 'bar',
            data: [18,35,48,40,34,23,19,25,37,28,30,24,16],
          },
        ],
        // 布局调试
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        tooltip: {},
      })
    },
  }
</script>

<style>
  .charts {
    width: 100%;
    height: 100%;
  }
</style>