<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'LineChart',
    mounted() {
      // 初始化 echarts
      let lineCharts = echarts.init(this.$refs.charts);
      // 配置数据
      lineCharts.setOption({
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: 'line',
            data: [18,35,48,40,34,23,41,38,19,26,39,20,14,27],
            // 拐点的样式设置
            itemStyle: {
              opacity: 0,
            },
            // 线条的样式
            lineStyle: {
              color: 'purple',
            },
            // 填充颜色的设置
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'purple',
                  },
                  {
                    offset: 1,
                    color: '#fff',
                  },
                ]
              },
            },
            smooth: true,
          },
        ],
        // 布局调试
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
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