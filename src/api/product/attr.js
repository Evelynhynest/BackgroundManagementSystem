// 平台属性管理模块的请求文件
import request from '@/utils/request';

// 获取一级分类数据的接口
// /admin/product/getCategory1 GET
export const reqCategory1List = () => request({url: '/admin/product/getCategory1', method: 'GET'});

// 获取二级分类数据接口（通过一级分类的ID获取二级分类的数据）
// /admin/product/getCategory2/{category1Id} GET
export const reqCategory2List = (category1Id) => request({url: `/admin/product/getCategory2/${category1Id}`, method: 'GET'});

// 获取三级分类数据接口（通过二级分类ID获取）
// /admin/product/getCategory3/{category2Id} GET
export const reqCategory3List = (category2Id) => request({url: `/admin/product/getCategory3/${category2Id}`, method: 'GET'});

// 获取商品基础属性信息
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} GET
export const reqAttrList = (category1Id, category2Id, category3Id) => request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'GET'});

// 添加属性接口
// /admin/product/saveAttrInfo POST
export const reqAddOrUpdateAttr = (data) => request({url: '/admin/product/saveAttrInfo', method: 'POST', data});
/* 
{
  "attrName": "string", // 属性名
  "attrValueList": [    // 属性名中包含的属性值，可以是多个，数组
    {
      "attrId": 0,      // 属性的id，对应属性名
      "valueName": "string" // 属性值
    }
  ],
  "categoryId": 0,      // category3Id
  "categoryLevel": 0,   // 3
}
*/





