// 获取品牌管理数据的模块

import request from '@/utils/request';

// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit} GET
export const reqTrademarkList = (page, limit) => request({url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'GET'});

// 处理添加品牌的操作
// /admin/product/baseTrademark/save POST 2个参数：品牌名称、品牌LOGO
// 切记：对于新增的品牌，给服务器传递数据，不需要传递ID，ID由服务器生成

// 处理修改品牌的操作
// /admin/product/baseTrademark/update PUT 3个参数：id、品牌名称、品牌LOGO
// 切记：对于修改某一个品牌的操作，前端携带的参数需要携带id，需要告诉服务器修改的是哪个品牌
export const reqAddOrUpdateTrademark = (trademark) => {
  // 带给服务器的数据携带id，代表修改操作
  if(trademark.id) {
    return request({url: '/admin/product/baseTrademark/update', method: 'PUT', data: trademark});
  } else {
    // 新增品牌
    return request({url: '/admin/product/baseTrademark/save', method: 'POST', data: trademark});
  }
}

// 删除品牌的接口
// /admin/product/baseTrademark/remove/{id} DELETE
export const reqDeleteTrademark = (id) => request({url: `/admin/product/baseTrademark/remove/${id}`, method: 'DELETE'});

