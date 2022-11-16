<template>
  <div>
    
    <el-table border :data="skuList">
      <el-table-column label="序号" type="index" width="66" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="150"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="width"></el-table-column>
      <el-table-column label="默认图片" width="108">
        <template v-slot="{row}">
          <img :src="row.skuDefaultImg" style="height: 90px">
        </template>
      </el-table-column>
      <el-table-column label="重量（kg）" prop="weight" width="96"></el-table-column>
      <el-table-column label="价格（元）" prop="price" width="96"></el-table-column>
      <el-table-column label="操作" width="width">
        <template v-slot="{row}">
          <el-button type="success" icon="el-icon-top" size="mini" v-if="row.isSale===1" @click="cancelSale(row)"></el-button>
          <el-button type="info" icon="el-icon-bottom" size="mini" v-else @click="onSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="undevelopment()"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
      style="text-align: center; margin-top: 20px;"
      :total="total" 
      :current-page="page" 
      :page-sizes="[5,7,10]" 
      :page-size="limit"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->, sizes, total"
      >
    </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer
      :visible.sync="show"
      :show-close="false"
      size="54%"
      >
    <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{skuInfo.skuName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{skuInfo.price}}元</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">平台属性</el-col>
      <el-col :span="16">
        <template>
          <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right: 10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
        <el-carousel height="300px">
          <el-carousel-item v-for="img in skuInfo.skuImageList" :key="img.id">
            <img :src="img.imgUrl" style="height: 100%; width: 100%">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Sku',
    data() {
      return {
        page: 1,
        limit: 7,
        total: 0,
        skuList: [],
        // 存储sku信息
        skuInfo: {},
        show: false,
      }
    },
    mounted() {
      this.getSkuList();
    },
    methods: {
      async getSkuList() {
        const { page, limit } = this;
        let result = await this.$API.sku.reqSkuList(page, limit);
        // console.log(result);
        if(result.code === 200) {
          this.skuList = result.data.records;
          this.total = result.data.total;
        }
      },
      handleCurrentChange(page) {
        this.page = page;
        this.getSkuList();
      },
      handleSizeChange(limit) {
        this.limit = limit;
        this.getSkuList();
      },
      // 上架
      async onSale(row) {
        let result = await this.$API.sku.reqSale(row.id);
        // console.log(result);
        if(result.code === 200) {
          row.isSale = 1;
          this.$message({type: 'success', message: '上架成功'});
        } else {
          console.log(result.data);
        }
      },
      async cancelSale(row) {
        let result = await this.$API.sku.reqCancel(row.id);
        // console.log(result);
        if(result.code === 200) {
          row.isSale = 0;
          this.$message({type: 'success', message: '下架成功'});
        } else {
          console.log(result.data);
        }
      },
      undevelopment() {
        this.$message({type: 'info', message: '正在开发中...'});
      },
      // 获取sku详情的方法
      async getSkuInfo(sku) {
        // 展示抽屉
        this.show = true;
        // 获取sku数据
        let result = await this.$API.sku.reqSkuById(sku.id);
        // console.log(result);
        if(result.code === 200) {
          this.skuInfo = result.data;
        }
      }
    },
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

</style>

<style scoped>
  .el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
  }
  .el-col {
    margin: 10px;
  }
  >>>.el-carousel__button {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
</style>
