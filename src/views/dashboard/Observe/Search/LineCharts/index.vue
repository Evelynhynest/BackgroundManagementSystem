<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1668682115775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2945" width="24" height="24"><path d="M512 179.2a332.8 332.8 0 1 1 0 665.6 332.8 332.8 0 0 1 0-665.6z m0 51.2a281.6 281.6 0 1 0 0 563.2 281.6 281.6 0 0 0 0-563.2z" p-id="2946" fill="#bfbfbf"></path><path d="M512.768 339.968a38.7072 38.7072 0 1 1 0 77.3632 38.7072 38.7072 0 0 1 0-77.3632zM546.4576 678.6048h-27.2384c-14.2848 0-29.0304-12.3904-29.0304-23.7056V498.0224h-9.728a25.8048 25.8048 0 1 1 0-51.6096s31.488-0.1024 32.3072 0c13.1072 0.9728 22.5792 6.656 22.5792 17.3568v163.2768h11.1104a25.8048 25.8048 0 1 1 0 51.5584z" p-id="2947" fill="#bfbfbf"></path></svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg t="1668682848170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2936" width="20" height="20"><path d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z" p-id="2937" fill="#d81e06"></path></svg>
      <svg t="1668688685343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" width="20" height="20"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="4299" fill="#1afa29"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'LineCharts',
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
            data: [18,31,34,23,19,26,30,20,22,27],
            // 拐点的样式设置
            itemStyle: {
              opacity: 0,
            },
            // 线条的样式
            lineStyle: {
              color: 'skyblue',
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
                    color: 'skyblue',
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

<style scoped>
  .header {
    display: flex;
    align-items: center;
    margin-top: -10px;
  }
  .search-header {
    margin-right: 5px;
  }
  .main {
    margin: 10px 0;
  }
  .main-title {
    margin-right: 30px;
  }
  .main-content {
    margin-right: 10px;
  }
  .charts {
    height: 100%;
    height: 50px;
  }
</style>