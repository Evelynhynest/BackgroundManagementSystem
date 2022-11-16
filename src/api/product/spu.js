import request from '@/utils/request';
// /admin/product/{page}/{limit} GET
export const reqSpuList = (page, limit, category3Id) => request({url: `/admin/product/${page}/${limit}`, method: 'GET', params: category3Id});

// 获取某个SPU的信息：/admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({url: `/admin/product/getSpuById/${spuId}`, method: 'GET'});

// 获取品牌的数据需要发请求：/admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({url: '/admin/product/baseTrademark/getTrademarkList', method: 'GET'});

// 获取SPU图片：/admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({url: `/admin/product/spuImageList/${spuId}`, method: 'GET'});

// 获取平台所有销售属性：/admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({url: '/admin/product/baseSaleAttrList', method: 'GET'});

// 添加或者修改 SPU，对于修改和添加，带给服务器的参数类似，
// 唯一的区别在于修改需要带 id
// /admin/product/saveSpuInfo POST
// /admin/product/updateSpuInfo POST
export const reqAddOrUpdateSpu = (spuInfo) => {
  // 如果携带的参数带有 id，表明该请求是修改 spu
  if(spuInfo.id) {
    return request({url: '/admin/product/updateSpuInfo', method: 'POST', data: spuInfo});
  } else {
    return request({url: '/admin/product/saveSpuInfo', method: 'POST', data: spuInfo});
  }
}



