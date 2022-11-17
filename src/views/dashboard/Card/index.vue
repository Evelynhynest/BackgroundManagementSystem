<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第1个Card -->
          <Detail title="总销售额" count="￥ 126506">
            <template slot="charts">
              <span style="font-size: 14px">周同比&nbsp;&nbsp;56.67%</span><svg t="1668682848170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2936" width="20" height="20"><path d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z" p-id="2937" fill="#d81e06"></path></svg>
              &nbsp;&nbsp;
              <span style="font-size: 14px">日同比&nbsp;&nbsp;19.96%</span><svg t="1668688685343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" width="20" height="20"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="4299" fill="#1afa29"></path></svg>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第2个Card -->
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer">
              <span>日访问量 1242</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第3个Card -->
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarChart></BarChart>
            </template>
            <template slot="footer">
              <span>转换率 64%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第4个Card -->
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressCharts></ProgressCharts>
            </template>
            <template slot="footer">
              <span style="font-size: 14px">周同比&nbsp;&nbsp;56%</span><svg t="1668682848170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2936" width="14" height="14"><path d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z" p-id="2937" fill="#d81e06"></path></svg>
              &nbsp;&nbsp;
              <span style="font-size: 14px">日同比&nbsp;&nbsp;19%</span><svg t="1668688685343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" width="14" height="14"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="4299" fill="#1afa29"></path></svg>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Detail from './Detail';
  import LineChart from './LineChart';
  import BarChart from './BarChart';
  import ProgressCharts from './ProgressCharts';
  export default {
    name: 'Card',
    components: {
      Detail,
      LineChart,
      BarChart,
      ProgressCharts,
    }
  }
</script>

<style>

</style>