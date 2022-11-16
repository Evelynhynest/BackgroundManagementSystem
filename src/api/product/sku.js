import request from '@/utils/request';

// 获取sku列表的接口
// /admin/product/list/{page}/{limit} GET
export const reqSkuList = (page, limit) => request({url: `/admin/product/list/${page}/${limit}`, method: 'GET'});

// 上架
// /admin/product/onSale/{skuId} GET
export const reqSale = (skuId) => request({url: `/admin/product/onSale/${skuId}`, method: 'GET'});

// 下架
// /admin/product/cancelSale/{skuId} GET
export const reqCancel = (skuId) => request({url: `/admin/product/cancelSale/${skuId}`, method: 'GET'});

// 获取sku详情的接口
// /admin/product/getSkuById/{skuId} GET
export const reqSkuById = (skuId) => request({url: `/admin/product/getSkuById/${skuId}`, method: 'GET'});


