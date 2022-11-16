Part3 P37-52

1.Spu 模块介绍（Spu类，Sku实例）
上下结构：
上面是三级联动全局组件
下面是三种不同组件切换：显示Spu、添加/修改Spu、添加Sku
默认显示Spu的页面中具体功能块：按钮显示气泡框、显示弹框

2.Spu 管理模块静态组件

3.动态展示 Spu 列表

4.Spu 管理内容切换的操作
（1）展示Spu列表的结构、添加/修改Spu的结构、添加Sku的结构，三种切换
（2）拆分出新的两个组件 SpuForm、SkuForm，实现条件渲染

5.完成 SpuForm 静态组件

6.SpuForm 请求业务的分析
获取品牌的数据需要发请求：/admin/product/baseTrademark/getTrademarkList
获取平台所有销售属性：/admin/product/baseSaleAttrList
获取某个SPU的信息：/admin/product/getSpuById/{spuId}
获取SPU图片：/admin/product/spuImageList/{spuId}

SpuForm 发请求的时机分析：
要求每次显示 SpuForm 子组件时都要发送以上四个请求
不能放在 SpuForm 的 mounted 钩子中，因为它在父组件挂载完毕时就已经挂载了且之后不会重复挂载，v-show 只是控制它的显示与隐藏

7.获取 SpuForm 数据

8.SpuForm 数据的展示与收集
在修改情况下收集数据的同时，要考虑好添加的数据如何收集保存
【添加】 SPU 的时候需要给服务器携带的参数：
{
  "category3Id": 0,
  "description": "string",
  "tmId": 0,
  "spuName": "string",
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
}

9.SpuForm 销售属性展示
整个项目中销售属性一共只有三个：颜色、尺码、版本

10.完成 SpuForm 照片墙图片的收集
一些要点：
（1）照片墙收集数据的时机？
  查看照片墙显示大图，需不需要收集数据（不需要，此时已经有了数据，只需要展示）
（2）照片墙在删除图片的时候需要收集数据，下次展示照片墙不会包括已删除的图片
（3）注意区分收集到的数据和最后带给服务器的数据
（4）照片墙在添加图片的时候，需要收集数据

11.销售属性的添加的操作
（1）要收集的数据：
baseSaveAttrId
saleAttrName
spuSaleAttrValueList
（2）收集数据的时机和存放位置：
需要综合考虑数据当前的使用情况，和潜在的使用场景
点击添加销售属性按钮时，把数据收集到 spu 对象上

12.完成销售属性值展示与收集
（1）新增的销售属性值需要收集的字段：
baseSaveAttrId
saleAttrValueName

13.删除销售属性与属性值的操作
三级联动组件的 disable 判断

14.完成修改SPU的保存操作
（1）整理参数
（2）发送提交服务器的请求
（3）页面组件的切换，停留在当前页码

15.完成添加SPU的操作
（1）点击添加SPU按钮的时候需要发送两个请求：获取品牌数据、全部销售属性的数据
（2）清空上次输入的数据
