<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :notShow="!showTable"/>
    </el-card>
    <el-card>
      <!-- 表格展示商品属性数据 -->
      <div v-show="showTable">
        <el-button
          :disabled="!category3Id"
          @click="changeToAddAttr"
          type="primary"
          icon="el-icon-plus"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="" label="属性值列表">
            <template v-slot="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 4px 10px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot="{row}">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="changeToUpdateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性的结构 -->
      <div v-show="!showTable">
        <el-form :inline="true" :model="newAttrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="newAttrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!newAttrInfo.attrName">添加属性值</el-button>
        <el-button @click="showTable=true">取消</el-button>
        <el-table border style="width: 100%; margin: 20px 0;" :data="newAttrInfo.attrValueList">
          <el-table-column 
            label="序号" 
            type="index" 
            align="center"
            width="80"
            >
          </el-table-column>
          <el-table-column 
            label="属性值名称"
            prop=""
            width="width"
            >
            <template v-slot="{row, $index}">
              <!-- {{row}} -->
              <!-- 这里的结构通过span与input切换实现查看与编辑模式切换效果 -->
              <el-input v-if="row.isEdit" :ref="$index" @blur="toLook(row)" @keyup.native.enter="toLook(row)" v-model="row.valueName" placeholder="请输入属性值名称" size="small"></el-input>
              <span v-else @click="changeToEdit(row, $index)" style="display: block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column 
            label="操作"
            prop=""
            width="width"
            >
            <template v-slot="{row, $index}">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :key="$index"
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
              <!-- confirm 注意 elementUI 的版本 -->
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="newAttrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="showTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 使用 lodash 中的深拷贝
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      // 控制属性数据表格的显示与隐藏
      showTable: true,
      // showTable: false,
      newAttrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
      // flag: true,
    };
  },
  methods: {
    // 自定义事件的回调，父子组件通信，获取三级属性Id
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的Id有了
        this.category3Id = categoryId;
        // 可以发请求获取平台属性
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code === 200) {
        this.attrList = result.data;
      } else {
        alert(result.data);
      }
    },
    // 点击添加属性。切换显示添加属性的相关组件
    changeToAddAttr() {
      this.showTable = false;
      // 清空上次输入的数据
      this.newAttrInfo = {
        attrName: "",
        attrValueList: [],
        // 此时三级分类的Id已经收集到了，可以在这里进行设置
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 添加属性值回调
    addAttrValue() {
      // 向属性值的数组里面添加元素
      // push 操作可以被 Vue 底层检测到数据的变化，所以会发生响应式变化
      this.newAttrInfo.attrValueList.push({
        // attrId 是相应属性的Id，目前是添加属性的操作，还没有相应的属性id，所以暂时给服务器带 undefined
        // valueName 相应属性值的名称
        attrId: this.newAttrInfo.id,  // 对于修改属性，可以在已有的属性基础之上新增属性值，此时需要带上已有的属性名Id
        valueName: '',
        // 给每一个属性值添加一个标记 isEdit 用于切换编辑于查看模式，以实现每个属性控制自己的模式切换
        // 当前 isEdit 属性是响应式数据（数据变化视图也随之变化，Vue 底层可以检测到）
        isEdit: true,
      });
      // input 自动聚焦
      this.$nextTick(() => {
        this.$refs[this.newAttrInfo.attrValueList.length - 1].focus();
      })
    },
    // changeToUpdateAttr({attrName, attrValueList}) {
    changeToUpdateAttr(row) {
      this.showTable = false;
      /* this.newAttrInfo = {
        attrName: attrName,
        attrValueList,
        // 此时三级分类的Id已经收集到了，可以在这里进行设置
        categoryId: this.category3Id,
        categoryLevel: 3,
      }; */
      // this.newAttrInfo = row;
      // （数据双向绑定造成：点击取消之后属性值依然被修改）
      // 由于数据结构中存在对象里面套数组，数组里面再套对象，如下的浅拷贝不能解决上面问题
      // 因此需要使用深拷贝解决
      // this.newAttrInfo = {...row};
      this.newAttrInfo = cloneDeep(row);
      // 在修改某一个属性时，给相应的属性值加上 isEdit 标记
      this.newAttrInfo.attrValueList.forEach(item => {
        // item.isEdit = false;
        // 上面这样写可以添加 isEdit 属性，但视图不会发生变化
        // 因为 isEdit 不是响应式数据
        // 使用 Vue.set() 向响应式对象中添加一个属性，
        // 能够确保这个新属性同样是响应式的，同时触发视图更新
        // 必须用于向响应式对象上添加新的属性，因为 Vue 无法探测普通的新增属性
        this.$set(item, 'isEdit', false);
      })
    },
    // 失去焦点的事件，切换为查看模式，展示 span
    toLook(row) {
      // row 是当前用户新添加的属性值
      // console.log(row);
      // 如果属性值为空不能作为新添加的属性值，需要提示用户重新输入
      if(row.valueName.trim() === '') {
        this.$message('您的输入不合法，请重新输入')
        return;
      }
      // 遍历查看是否已经存在相同的属性值
      // 注意：遍历的时候不能包括新添加的属性值，即自身
      let isRepeat = this.newAttrInfo.attrValueList.some(item => {
        // 再判断的时候需要将 row（新增/修改的属性值）从数组里面排除掉
        if(item !== row) {
          return row.valueName === item.valueName;
        }
      });
      // console.log(isRepeat);
      if(isRepeat) {
        alert('重复输入');
        return;
      }
      // 从编辑模式切换到查看模式
      row.isEdit = false;
    },
    // 点击 span 变为编辑模式
    changeToEdit(row, index) {
      row.isEdit = true;
      // 获取点击的 input 元素，实现自动聚焦
      // console.log(this);
      // 这里 $refs 都是 undefined 是因为页面还没有渲染完
      // console.log(this.$refs.index);
      // console.log(this.$refs[index]);
      // 需要注意，点击 span 时需要切换为 input 编辑模式
      // 但需要注意，浏览器对页面进行重绘与重排需要耗费时间
      // 点击 span 时，重绘重排一个 input 需要耗费时间，因此不可能一点击 span 就立刻获取到 input
      this.$nextTick(() => {
        console.log(this);
        // console.log(this.$refs.index);
        // console.log(this.$refs[index]);
        // 获取 input 表单元素自动聚焦
        this.$refs[index].focus();
      })
      // this.$nextTick() 保证节点渲染完毕 input 已经存在了
    },
    // 气泡确认框确认按钮的回调
    deleteAttrValue(index) {
      // 当前删除属性值的操作是不需要发请求的，目前还在修改，等保存时统一发请求
      this.newAttrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮，添加或修改属性操作
    async addOrUpdateAttr() {
      // 整理参数
      // 提交服务器前需要判断 input 属性值是否为空，
      // 以及不应该把 isEdit 字段提交给服务器（只用于前端切换组件，服务器用不到）
      // 数组 filter 方法的参数是一个函数，所有数组成员依次执行该函数，
      // 返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。
      this.newAttrInfo.attrValueList = this.newAttrInfo.attrValueList.filter(item => {
        // 过滤掉属性值不为空的
        if(item.valueName != '') {
          // 然后删除掉 isEdit 属性
          delete item.isEdit;
          return true;
        }
      })
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.newAttrInfo);
        // 展示平台属性页面的数据
        this.showTable = true;
        // 弹出提示消息
        this.$message({type: 'success', message: '保存成功'});
      } catch (error) {
        alert(error);
      }
      // 保存成功以后需要再次获取最新的平台属性进行展示
      this.getAttrList();
    }
  },
};
</script>

<style></style>
