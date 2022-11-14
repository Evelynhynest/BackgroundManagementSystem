<template>
  <div>
    <!-- inline 代表的是行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" :model="cateFrom" class="demo-form-inline">
      <el-form-item label="一级分类">
        <!-- 为什么 v-model 双向绑定的是 id，但是 select 能展示 name，select 和 option 中的 label、value 属性和v-model到底什么关系 -->
        <el-select
          placeholder="请选择"
          v-model="cateFrom.category1Id"
          @change="handler1"
          :disabled="notShow"
        >
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select 
          placeholder="请选择" 
          v-model="cateFrom.category2Id"
          @change="handler2"
          :disabled="notShow"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select 
          placeholder="请选择" 
          v-model="cateFrom.category3Id"
          @change="handler3"
          :disabled="notShow"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ['notShow'],
  data() {
    return {
      // 收集相应的一级二级三级分类的id
      cateFrom: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if (result.code === 200) {
        this.category1List = result.data;
      } else {
        alert(result.data);
      }
    },
    // 一级分类的select事件回调，当一级分类的option发生变化时
    async handler1() {
      // 清空上次数据
      this.cateFrom.category2Id = "";
      this.cateFrom.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      const { category1Id } = this.cateFrom;
      // this.$emit('getCategoryId', {category1Id});
      this.$emit('getCategoryId', {categoryId: category1Id, level: 1});
      let result = await this.$API.attr.reqCategory2List(category1Id);
      // console.log(result);
      if (result.code === 200) {
        this.category2List = result.data;
      } else {
        alert(result.data);
      }
    },
    async handler2() {
      // 清空上次数据
      this.cateFrom.category3Id = "";
      this.category3List = [];
      const { category2Id } = this.cateFrom;
      // this.$emit('getCategoryId', {category2Id});
      this.$emit('getCategoryId', {categoryId: category2Id, level: 2});
      let result = await this.$API.attr.reqCategory3List(category2Id);
      // console.log(result);
      if (result.code === 200) {
        this.category3List = result.data;
      } else {
        alert(result.data);
      }
    },
    async handler3() {
      const { category3Id } = this.cateFrom;
      // this.$emit('getCategoryId', {category3Id});
      this.$emit('getCategoryId', {categoryId: category3Id, level: 3});
    }
  },
};
</script>

<style></style>
