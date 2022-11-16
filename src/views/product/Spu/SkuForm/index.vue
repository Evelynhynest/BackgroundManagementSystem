<template>
  <div>
    <el-form>
      <el-form-item label="SPU名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input placeholder="重量（千克）" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc" ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
            <!-- 把两个平台属性的值收集到各自的平台属性 attr 身上：attrIdAndValue，每一个都有自己的，方便整理 -->
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option v-for="attrValue in attr.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option v-for="saleAttrValue in spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="66"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template v-slot="{row}">
              <img :src="row.imgUrl" style="height: 90px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button type="primary" v-if="row.isDefault === 0" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 图片的数据
      spuImageList: [],
      // 销售属性列表的数据
      spuSaleAttrList: [],
      // 平台属性列表的数据
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 1.父组件给的数据：
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 2.通过表单数据双向绑定v-model收集的数据：
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 3.需要自己另想办法收集
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 默认图片
        skuDefaultImg: "",
        // 收集图片
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // sku销售属性列表
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      // 收集图片的数据字段，缺少 isDefault 字段，提交服务器之前需要整理添加
      imageList: [],
    };
  },
  methods: {
    // 获取 SkuForm 数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件传来的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片的数据
      let p1 = this.$API.spu.reqSpuImageList(spu.id);
      let p2 = this.$API.spu.reqSpuSaleAttrList(spu.id);
      let p3 = this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      const [result1, result2, result3] = await Promise.all([p1, p2, p3]);
      if (result1.code === 200) {
        // 从服务器获取的图片列表信息数据中缺少 isDefault 字段，
        // 手动给每一张图片的信息添加该字段
        let list = result1.data;
        list.forEach(item => {
          item.isDefault = 0;
        });
        this.skuImageList = list;
      } else {
        alert(result1.data);
      }
      if (result2.code === 200) {
        this.spuSaleAttrList = result2.data;
      } else {
        alert(result2.data);
      }
      if (result3.code === 200) {
        this.attrInfoList = result3.data;
      } else {
        alert(result3.data);
      }
    },
    // table 复选框按钮的事件
    handleSelectionChange(selection) {
      // 参数可以获取到用户选中图片的信息数据，但是其中缺少 isDefault 字段
      // console.log(selection);
      this.imageList = selection;
    },
    // 设排他置默认图片
    changeDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 设置默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 点击取消按钮，通知父组件切换场景
    cancel() {
      this.$emit('changeSceneBySkuForm', 0);
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 保存按钮的回调
    async saveSku() {
      // 收集整理参数，提交给服务器
      // 【整理平台属性数据】
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      /* // 方法1：
      let arr = [];
      // 整理收集到的数据
      attrInfoList.forEach(item => {
        // 有该属性代表用户进行了选择
        const [attrId, valueId] = item.attrIdAndValueId.split(':');
        // 带给服务器的参数应该是一个对象
        const obj = {attrId, valueId};
        arr.push(obj);
      });
      // 将整理好的参数赋值给 skuInfo.skuAttrValueList
      skuInfo.skuAttrValueList = arr; */
      // 方法2：
      // let result = 
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, cur) => {
        if(cur.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':');
          prev.push({attrId, valueId});
        }
        return prev;
      }, []);
      // console.log(result);
      // 【整理销售属性】
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, cur) => {
        if(cur.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':');
          prev.push({saleAttrId, saleAttrValueId});
        }
        return prev;
      }, []);
      // 【整理图片的数据】
      console.log(imageList);
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: item.url,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      });
      // 【发请求】
      let result = await this.$API.spu.reqAddSku(skuInfo);
      // console.log(result);
      if(result.code === 200) {
        this.$message({type: 'success', message: '添加SKU成功'});
        this.$emit('changeSceneBySkuForm', 0);
      }
    }
  },
};
</script>

<style></style>
