<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
       <!-- @tab-click="handleClick" -->
       <!-- 头部左侧内容 -->
       <el-tabs class="tab" v-model="activeName">
         <el-tab-pane label="销售额" name="sale"></el-tab-pane>
         <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setToday">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- :default-time="['00:00:00', '23:59:59']" -->
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="date"
            class="date"
            size="mini"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 准备一个容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{title}}排名</h3>
          <ul>
            <li>
              <span class="rIndex">0</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span class="rIndex">1</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span class="rIndex">2</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span class="rIndex">3</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rValue">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';
  import * as echarts from 'echarts';
  import dayjs from 'dayjs';
  export default {
    name: 'Sale',
    data() {
      return {
        activeName: 'sale',
        myCharts: null,
        // 收集日历的数据
        date: [],
      }
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.charts);
      this.myCharts.setOption({
        title: {
          text: '销售额趋势',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
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
            data: [],
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
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [],
            // color: 'skyblue',
          }
        ]
      });
    },
    computed: {
      // 标题计算属性
      title() {
        return this.activeName === 'sale' ? '销售额' : '访问量';
      },
      ...mapState({
        listState: state => state.home.list,
      }),
    },
    // 监听属性
    watch: {
      title() {
        // console.log('修改图表配置的数据');
        // 标题发生变化，重新设置图表的配置数据
        // 图表的配置数据可以再次修改，如果有新的数值，就用新的，如果没有还是用旧的
        this.myCharts.setOption({
          title: {
            text: this.title + '趋势',
          },
          xAxis: {
            data: this.title === '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis,
          },
          series: [
            {
              data: this.title === '销售额' ? this.listState.orderFullYear : this.listState.userFullYear,
            }
          ]
        });
      },
      // 为什么一写监听 listState 就拿不到仓库数据，一直是 undefined？
      // listState(value) {
      //   this.listState = value;
      //   console.log('listState changed');
      // }
    },
    methods: {
      setToday() {
        const day = dayjs().format('YYYY-MM-DD');
        this.date = [day, day];
      },
      setWeek() {
        const start = dayjs().day(1).format('YYYY-MM-DD');
        const end = dayjs().day(7).format('YYYY-MM-DD');
        // console.log(start, end);
        this.date = [start, end];
      },
      setMonth() {
        const start = dayjs().startOf('month').format('YYYY-MM-DD');
        const end = dayjs().endOf('month').format('YYYY-MM-DD');
        this.date = [start, end];
      },
      setYear() {
        const start = dayjs().startOf('year').format('YYYY-MM-DD');
        const end = dayjs().endOf('year').format('YYYY-MM-DD');
        this.date = [start, end];
      },
    }
  }
</script>
<style scoped>
  .clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .tab {
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0;
  }
  /* .right  */
  span {
    margin: 0 12px;
    font-size: 14px;
  }
  .date {
    width: 220px;
    margin: 0 20px;
  }
  .charts {
    width: 100%;
    height: 300px;
  }
  ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
  }
  ul li {
    height: 8%;
    margin: 10px 0;
  }
  .rIndex {
    float: left;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    text-align: center;
  }
  .rValue {
    float: right;
  }
</style>