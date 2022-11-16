Part4 P53-63

1.完成SKU静态组件
（1）点击添加SKU按钮，切换场景2
（2）完成静态布局

2.获取添加SKU的数据
（1）获取图片列表接口：GET /admin/product/spuImageList/{spuId}
（1）获取销售属性列表接口：GET /admin/product/spuSaleAttrList/{spuId}
（1）获取平台属性列表接口：前面attr写过

3.SKUForm数据收集与展示
{
  "category3Id": 0,
  "createTime": "2022-11-16T06:59:41.273Z",
  "isSale": 0,
  "price": 0,
  "spuId": 0,
  "tmId": 0,
  "weight": "string",
  "skuAttrValueList": [
    {
      "attrId": 0,
      "attrName": "string",
      "skuId": 0,
      "valueId": 0,
      "valueName": "string"
    }
  ],
  "skuDefaultImg": "string",
  "skuDesc": "string",
  "skuImageList": [
    {
      "imgName": "string",
      "imgUrl": "string",
      "isDefault": "string",
      "skuId": 0,
      "spuImgId": 0
    }
  ],
  "skuName": "string",
  "skuSaleAttrValueList": [
    {
      "saleAttrId": 0,
      "saleAttrName": "string",
      "saleAttrValueId": 0,
      "saleAttrValueName": "string",
      "skuId": 0,
      "spuId": 0
    }
  ],
}

4.sku 图片的展示与收集

5.完成 skuForm 保存的操作
整理数据向服务器发请求

6.sku 列表的展示

7.查看 sku 列表的 loading 效果
一些小问题：
（1）loading效果目前只会展示一次
（2）快速切换查看sku会发现上一次的数据会显示

8.sku模块数据展示与分页功能
（1）写静态页面
（2）发请求获取数据动态展示
（3）分页功能实现

9.完成sku上架与下架操作

10.完成sku查看详情业务

11.深度选择器讲解
（1）scoped属性的作用
  1）加上scoped的作用是限定样式的作用范围：只对当前组件生效
  对于某一个组件，如果给style加上scoped属性，会给当前子组件的结构中都添加上一个data-v-xxx（哈希值）自定义属性，然后vue通过属性选择器，给需要添加的元素添加样式（h3[data-v-7ba5bd90]）
  2）子组件的根标签也会拥有父组件当中的自定义属性，如果子组件的根节点和父组件中写的样式相同，也会添加上相应的样式

（2）注意：如果父组件的样式加上了scoped，但还想影响子组件的样式，这种情况下我们可以使用深度选择器

（3）深度选择器可以实现样式穿透
原生CSS >>>
less /deep/
scss ::v-deep


