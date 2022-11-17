<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'ProgressCharts',
    mounted() {
      // 初始化 echarts
      let barCharts = echarts.init(this.$refs.charts);
      // 配置数据
      barCharts.setOption({
        xAxis: {
          show: false,
          // 最大值与最小值的设置
          max: 100,
          min: 0,
        },
        yAxis: {
          show: false,
          type: 'category',
        },
        series: [
          {
            type: 'bar',
            data: [78],
            color: 'yellowgreen',
            // 设置柱状图宽度
            barWidth: 10,
            // 开启背景颜色展示
            showBackground: true,
            backgroundStyle: {
              color: '#eee',
            },
            // 文本标签设置
            label: {
              show: true,
              formatter: '|',
              position: 'right',
            }
          },
        ],
        // 布局调试
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
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