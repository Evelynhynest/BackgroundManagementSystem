<template>
  <div>
    <!-- 按钮 -->
    <el-button 
      type="primary" 
      icon="el-icon-plus" 
      style="margin: 10px 0px"
      @click="showDialog"
    >
      添加
    </el-button>
    <!-- 表格组件
      table的属性
        data：表格组件将来需要展示的数据（数组类型）
        border：给表格添加边框

      column的属性
        label：显示的列标题
        width：列的宽度
        align：标题的对齐方式
        type="index"：显示序号
        prop：对应列内容的字段名

      注意：在elementUI的table组件中，数据是以一列为单位进行展示
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="72px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <!-- <template v-slot="{row, $index}"> -->
        <template v-slot="{row}">
          <!-- {{row}}---{{$index}} -->
          <img :src="row.logoUrl" style="height: 60px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTrademark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
      pager-count：按钮的数量（包括头尾页码，与连续页码）
      @current-change="handlerCurrentChange"：页码发生变化时
      @size-change="handlerSizeChange"：每页展示数据条数发生变化时
    -->
    <el-pagination 
      style="margin-top: 20px; text-align: center;"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      layout="prev, pager, next, jumper, ->,sizes, total"
      @current-change="getPageList"
      @size-change="handlerSizeChange"
    >
    </el-pagination>
    <!-- 对话框
      :visible.sync 用于控制对话框显示与隐藏
    -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form 表单 
        model：将表单的数据收集到哪个对象上，将来【表单验证也必须要有这个属性】
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
        并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
           -->
           <!-- 这里收集数据不能使用 v-model，因为不是表单元素
            action：设置图片上传的地址
            :on-success：可以检测到图片上传成功，同时执行一次
            :before-upload：可以在上传图片之前执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'TradeMark',
    data() {
      // 自定义校验规则
      let validateTmName = (rule, value, callback) => {
        if(value.length < 2 || value.length > 8) {
          callback(new Error('品牌名称长度在 2 到 8 个字符'));
        } else {
          callback();
        }
      }
      return {
        page: 1,
        limit: 3,
        // 总共数据的条数
        total: 0,
        // 列表展示的数据
        list: [],
        // 对话框显示与隐藏控制的属性
        dialogFormVisible: false,
        // 收集品牌信息，对象身上的属性不能瞎写，要看API文档
        tmForm: {
          tmName: '',
          logoUrl: '',
        },
        // 表单验证的规则
        rules: {
          // 品牌名称的验证规则
          // required：必须要校验的字段，与必填*号相关
          // message：提示信息
          // trigger：用户行为事件（常用change/blur）
          // min/max：最小/最大长度限制
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            // { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
            // 自定义校验规则
            {validator: validateTmName, trigger: 'change'},
          ],
          // 品牌logo的验证规则
          logoUrl: [
            { required: true, message: '请选择品牌的图片' },
          ],
        }
      }
    },
    mounted() {
      // console.log(this.$API);
      this.getPageList();
    },
    methods: {
      // 自定义事件 current-change 会给回调传递参数 pager（表示点击要切换的页码）
      async getPageList(pager = 1) {
        this.page = pager;
        let result = await this.$API.trademark.reqTrademarkList(this.page, this.limit);
        // console.log(result);
        if(result.code === 200) {
          this.total = result.data.total;
          this.list = result.data.records;
        }
      },
      /* // 当前页码发生变化时触发的方法
      handlerCurrentChange(pager) {
        // 点击的页码
        // console.log(pager);
        // 修改当前页码数据
        this.page = pager;
        this.getPageList();
      } */
      // 当分页器某一页展示数据的条数发生变化时触发
      handlerSizeChange(limit) {
        // console.log(limit);
        this.limit = limit;
        this.getPageList();
      },
      // 点击添加品牌的按钮
      showDialog() {
        // 显示对话框
        this.dialogFormVisible = true;
        // 清除数据
        this.tmForm = {tmName: '', logoUrl: ''};
      },
      // 修改某一个品牌
      // 接收的参数 row 即为当前用户选中这个品牌的信息
      updateTrademark(row) {
        this.dialogFormVisible = true;
        // console.log(row);
        // 将已有的品牌信息赋值给 tmForm 进行展示
        // 将服务器返回的品牌信息直接赋值给 tmForm 进行展示
        // 也就是说，tmForm 存储的即为服务器的品牌信息
        // 直接赋值，两者指向的是同一个地址同一个对象，
        // 修改表格中的数据，即修改服务器中的数据
        // this.tmForm = row;
        // 通过深拷贝避免引用影响
        this.tmForm = {...row};
      },
      // 上传图片相关的回调
      // 图片上传成功
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(res, file);
        // res：上传成功后返回给前端的图片数据（res.data 数据即图片在服务器的地址）
        // file：上传成功后返回给前端的图片数据（图片详细信息）
        // 收集品牌图片数据，将来需要带给服务器
        this.tmForm.logoUrl = res.data;
      },
      // 图片上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 添加按钮，添加品牌或者修改品牌
      addOrUpdateTrademark() {
        // 当全部表单验证字段通过，才继续书写业务逻辑
        this.$refs.ruleForm.validate(async (valid) => {
          // console.log(valid);
          // 如果全部字段符合条件
          if(valid) {
            this.dialogFormVisible = false;
            let result = await this.$API.trademark.reqAddOrUpdateTrademark(this.tmForm);
            // console.log(result);
            if(result.code === 200) {
              // 弹出提示框：添加品牌成功/修改品牌成功
              // this.$message(this.tmForm.id ? '修改品牌成功' : '添加品牌成功');
              this.$message({
                type: 'success',
                message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
              });
              // 添加或修改品牌成功后，再次获取品牌列表进行展示
              // 如果是添加品牌，停留在第一页，修改品牌则停留在当前页面
              this.getPageList(this.tmForm.id ? this.page : 1);
            }
          } else {
            console.log('submit failed');
            return false;
          }
        })
      },
      // 删除品牌的操作
      deleteTrademark(row) {
        // console.log(row);
        // 弹出框
        this.$confirm(`确定删除${row.tmName}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 用户点击确认按钮时触发
          // 确认后向服务器发送请求删除数据
          // 重新获取服务器数据进行展示
          let result = await this.$API.trademark.reqDeleteTrademark(row.id);
          if(result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 需要判断当前页面数据的个数，据此跳转页面
            // 如果当前页的数据大于1，删除后该页面还有数据，应该停在当前页
            // 否则，当前页面没有数据，应该跳转到上一页
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        }).catch(() => {
          // 用户点击取消按钮时触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>