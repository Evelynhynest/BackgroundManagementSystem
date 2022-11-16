<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select value="" placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="请输入SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl"/>
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unselectedSaleAttr.length}个未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unselectedSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table border style="margin-top: 20px" :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template v-slot="{row}">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              <!-- 
              -->
              </el-input>
               <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储 SPU 信息属性，初始为空对象，
      // 在修改SPU的时候会向服务器发请求，返回SPU信息（对象），
      // 修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      // 但是添加新的SPU时并没有向服务器发请求，
      // 数据收集到 spu 空对象，但是缺少具体的属性字段
      spu: {
        category3Id: 0, // 三级分类的 Id
        description: "",  // SPU 描述
        tmId: '',  // 品牌的 Id
        spuName: "",  // SPU 的名称
        spuImageList: [ // 收集 SPU 图片
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [  // 平台属性与属性值的数据
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      // 存储品牌信息
      trademarkList: [],
      spuImageList: [],
      // 整个平台所有的三个销售属性信息
      saleAttrList: [],
      // 收集未选择的销售属性的 Id
      attrIdAndAttrName: '',
    };
  },
  methods: {
    // 照片墙删除某一张图片时触发
    handleRemove(file, fileList) {
      // file：删除的那张图片
      // fileList：照片墙删除某张图片后剩余的其他图片，需要收集起来
      // console.log(file, fileList);
      // 收集照片墙图片的数据
      // 对于已有的图片（照片墙中显示的图片，有 name 和 url 字段）
      // 这两个字段是为了让照片墙显示图片手动加上的，不需要发给服务器，需要再处理
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      // 将图片地址赋值给 dialogImageUrl 属性
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    // 初始化 spuForm 的数据
    async initSpuData(spu) {
      // console.log('发请求', spu);
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      // console.log(spuResult);
      if (spuResult.code === 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌信息
      let trademarkResult = await this.$API.spu.reqTrademarkList();
      // console.log(trademarkResult);
      if (trademarkResult.code === 200) {
        this.trademarkList = trademarkResult.data;
      }
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      // console.log(spuImageResult);
      if (spuImageResult.code === 200) {
        // this.spuImageList = spuImageResult.data;
        // 由于照片墙对显示图片的数据格式有要求，需要修改获取的数据
        let listArr = spuImageResult.data;
        listArr.forEach(item => {
          item.name = item.imgName;
          item.url = item.imgUrl
        });
        this.spuImageList = listArr;
      }
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      console.log(saleResult);
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 照片墙图片上传成功的回调
    handleSuccess(response, file, fileList) {
      // response：服务器返回的信息，可以看到图片在服务器上的真实路径
      // file：上传的图片信息
      // fileList：上传成功的所有图片信息
      // console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 已经收集到了需要添加的销售属性的信息
      // 把收集到的销售属性数据进行分割处理
      let [baseSaveAttrId, saleAttrName] = this.attrIdAndAttrName.split(':');
      // 向 spu 对象的 spuSaleAttrList 添加一个新的对象
      let newSale = {
        baseSaveAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      }
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSale);
      // 清空数据
      this.attrIdAndAttrName = '';
    },
    // 点击添加属性值按钮的回调
    addSaleAttrValue(row) {
      // 点击添加按钮时，需要从 button 变为 input，
      // 通过销售属性的 inputVisible 控制
      // 挂载在销售属性身上的响应式数据 inputVisible 控制着 button 与 input 的切换
      this.$set(row, 'inputVisible', true);
      // 通过响应式数据 inputValue 收集新增的销售属性值
      this.$set(row, 'inputValue', '');
    },
    // el-input 失去焦点的事件
    handleInputConfirm(row) {
      // 解构出销售属性中收集的数据
      const {baseSaveAttrId, inputValue} = row;
      // （一些输入合法性判断）新增的销售属性值的名称不能为空
      if(inputValue.trim() === '') {
        this.$message('属性值不能为空');
        return;
      }
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName===inputValue);
      if(result) return;
      // 新增的销售属性值
      let newSaleAttrValue = {baseSaveAttrId, saleAttrValueName: inputValue};
      // 修改 inputVisible 字段，为 false，显示 button
      row.inputVisible = false;
      row.spuSaleAttrValueList.push(newSaleAttrValue);
    },
    // 保存按钮的回调
    async addOrUpdateSpu() {
      // 1.整理参数（照片墙的数据）
      // 图片需要携带 imgName 和 imgUrl 字段，而非展示照片墙用的 name 和 url
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          // 对于新增的图片，服务器返回的 response 才是图片在服务器的路径
          // 而服务器原有的图片，其在服务器上的路径已经存在自身的 url 属性中了
          imgUrl: (item.response&&item.response.data)||item.url,
        };
      });
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      console.log(result);
      if(result.code === 200) {
        // 提示成功
        this.$message({type: 'success', message: '保存成功'});
        // 通知父组件回到 scene 0
        this.$emit('changeScene', {scene: 0, flag: this.spu.id?'修改':'添加'});
      }
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 点击添加 SPU 按钮的时候，发请求的回调
    async addSpuData(category3Id) {
      // 点击添加 SPU 按钮时收集三级分类Id
      this.category3Id = category3Id;
      // 获取品牌信息
      let trademarkResult = await this.$API.spu.reqTrademarkList();
      // console.log(trademarkResult);
      if (trademarkResult.code === 200) {
        this.trademarkList = trademarkResult.data;
      }
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(saleResult);
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 取消按钮
    cancel() {
      // 取消按钮的回调，通知父组件切换场景为 0
      this.$emit('changeScene', {scene: 0, flag: ''});
      // Object.assign() ES6新增的合并对象方法
      // 组件实例 this._data 可以操作 data 中的响应式数据
      // console.log(this._data);
      // this.$options 配置对象，即当前创建组件实例传入的 data 函数（执行返回空对象）
      // console.log(this.$options);
      Object.assign(this._data, this.$options.data());
    }
  },
  mounted() {
    // console.log('发请求');
  },
  computed: {
    // 计算出还未选择的销售属性
    unselectedSaleAttr() {
      // 整个平台的销售属性一共三个（颜色、版本、尺寸）：saleAttrList
      // 当前SPU所有的属于自己的销售属性（例如颜色）：spu.spuSaleAttrList
      // 数组过滤方法，可以从已有的数组中过滤出用户需要的元素，并返回新数组
      let result = this.saleAttrList.filter(item => {
        // console.log(item);
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName;
        });
      });
      // console.log(result);
      return result;
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  </style>
