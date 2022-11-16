<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :notShow="scene!=0"/>
    </el-card>
    <el-card>
      <!-- 底部将来要在三种情况下切换 -->
      <div v-show="scene === 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table border :data="records">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="width"></el-table-column>
          <el-table-column label="SPU描述" prop="" width="width"></el-table-column>
          <el-table-column label="操作" prop="description" width="width">
            <template v-slot="{row}">
              <!-- 这里的按钮将来用 hintButton 替换, $index -->
              <HintButton type="success" icon="el-icon-plus" size="mini" title="添加SKU"></HintButton>
              <HintButton  @click="updateSpu(row)" type="warning" icon="el-icon-edit" size="mini" title="修改SPU"></HintButton>
              <HintButton type="info" icon="el-icon-info" size="mini" title="查看当前SPU的所有SKU列表"></HintButton>
              <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除SPU"></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 7]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          >
        </el-pagination>
      </div>
      <SpuForm v-show="scene === 1" @changeScene="changeScene" ref="spuForm"/>
      <SkuForm v-show="scene === 2"/>
    </el-card>
  </div>
</template>

<script>
  import SpuForm from './SpuForm';
  import SkuForm from './SkuForm';
  export default {
    name: 'Spu',
    components: {
      SpuForm,
      SkuForm
    },
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        page: 1,
        limit: 3,
        total: 0,
        // spu 列表数据
        records: [],
        scene: 0, // 0表示展示SPU列表数据，1表示添加/修改SPU，2表示添加SKU
      }
    },
    methods: {
      // 三级联动的自定义事件，可以把子组件相应选中的Id传给父组件
      getCategoryId({categoryId, level}) {
        // categoryId 获取Id，level 判断分类级别
        if(level === 1) {
          this.category1Id = categoryId;
          this.category2Id = '';
          this.category3Id = '';
        } else if (level === 2) {
          this.category2Id = categoryId;
          this.category3Id = "";
        } else {
          this.category3Id = categoryId;
          this.getSpuList();
        }
      },
      async getSpuList() {
        const {page, limit, category3Id} = this;
        let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
        // console.log(result);
        if(result.code === 200) {
          this.records = result.data.records;
          this.total = result.data.total;
        }
      },
      handleCurrentChange(page) {
        this.page = page;
        this.getSpuList();
      },
      handleSizeChange(limit) {
        this.limit = limit;
        this.getSpuList();
      },
      // 添加 Spu 按钮的回调
      addSpu() {
        this.scene = 1;
        // 通知子组件发2个请求：获取品牌数据、全部销售属性的数据
        this.$refs.spuForm.addSpuData(this.category3Id);
      },
      updateSpu(row) {
        this.scene = 1;
        // 获取子组件 spuForm
        console.log(this.$refs.spuForm.initSpuData(row));
      },
      changeScene({scene, flag}) {
        // flag 用于区分保存按钮是添加还是修改
        // 切换场景，子给父传数据
        this.scene = scene;

        // 子组件通知父组件修改场景，需要再次获取 SPU 列表的数据进行展示
        // 还要留在当前页（这里如果前面写了单独处理页码变化的 handleCurrentChange 回调应该就不用传 this.page 了吧？
        this.getSpuList();
        if(flag === '添加') {
          this.page = 1;
          this.getSpuList();
        }
      }
    }
  }
</script>

<style>

</style>