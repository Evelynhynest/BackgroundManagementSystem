<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
      <el-table
        style="width: 100%"
        :data="tableData"
        border
      >
        <el-table-column
          label="排名"
          type="index"
          width="64"
          align="center">
        </el-table-column>
        <el-table-column
          label="搜索关键字">
        </el-table-column>
        <el-table-column
          sortable
          label="用户数">
        </el-table-column>
        <el-table-column
          sortable
          label="周涨幅">
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import LineCharts from './LineCharts';
  export default {
    name: 'Search',
    data() {
      return {
        tableData: [{}],

      }
    },
    components: {
      LineCharts,
    }
  }
</script>

<style>
  .search-header {
    display: flex;
    justify-content: space-between;
  }
  .header {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .pagination {
    float: right;
  }
</style>